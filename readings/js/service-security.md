# Service Security and Browsers

Originally, the web did not have JS.  When you loaded a page, the only interaction was entering data in a form and loading a new page (or following a link and loading a new page).

As JS start adding new dynamic options, new security issues were discovered.

If you load my page of cat videos, what happen when I make a service request (a `fetch()` call or other XHR request) to, say, your bank?

## Same Origin Policy (SOP)

To block those sorts of security issues, the Same Origin Policy was adopted.  

An "Origin" is the protocol (e.g http, https) + the domain (exact domain, so subdomains are treated as different) + the port.

The SOP says that a browser may only load resources from the same "origin".  

Exceptions are allowed for loading CSS, images, and JS _files_ from other origins, because those were done a lot in the early web (and continue to be done today) and things would break if those weren't allowed.

Overall, the SOP worked - browsers became more secure.  

But there were problems.  What if you WANT to allow a cross-origin resource to load?  What if you don't want to allow just anything, but perhaps you want to allow from a subdomain (for example, a site like http://www.example.com/ might load resources from http://static.example.com and call services on http://services.example.com)

What was needed was a flexible way to create exceptions to SOP.

## Cross Origin Resource Sharing (CORS)

CORS is a browser-enforced policy to handle exceptions to SOP.

Like SOP, this means it is only true inside browsers.  A program calling a web-based endpoint for a service will not encounter any CORS issues.  This is because browsers represent a unique security problem.  (Your backend program probably isn't surfing cat videos while banking, but peoples browsers definitely are.)

CORS works by having the server hosting the service return certain headers in the responses to calls.  The browser will inspect these headers to decide if the page loaded in the browser is permitted to make the call.  If it is not, the browser will NOT show the response data to the calling JS.

In fact, if the service call is considered a "non-simple" request, before the browser even makes the call the browser will first send an EXTRA call, using the OPTIONS http method.  The browser will check the headers to THAT response to decide if the real call will be allowed, and if it is not, the real call isn't even made.  This is known as a "preflight" request.  (The definition of a "simple" request varies by browser, but generally means only GET or POST and no custom or unusual headers.)

### Misleading CORS Error Messages

When the browser determines a request is not allowed, it will give a console error like: 
`Access to fetch at 'http://example.com/api/' from origin 'http://whatever.examplecat.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.`

This can be very misleading. 

The core issue is correct - the response did not have the 'Access-Control-Allow-Origin' header that would tell the browser the origin of the currently loaded page was allowed to call this url.

BUT there are two problems:
* First, the last sentence is very unhelpful.  An "opaque" response means you and your JS don't get to see the response.  That is almost never what you need.  This error messages leads to people trying to set mode 'no-cors' when that won't fix the problem of not being able to see the response.  In fact, if a preflight is made and fails, a `no-cors` request won't even send the data to the server, much less get the response to you. 
* Second, This message indicates a CORS issue, but that does NOT mean the CORS issue is the real problem.  There are many servers out there that will not send CORS headers on error responses.  If you make a bad request (http status code 400), and the server ALSO doesn't send the CORS headers on that response, you can get distracted by the CORS issue when the real problem is whatever caused the 400 error.  (Assuming the server correctly sends CORS headers on success (http status code 200).  

When you get a CORS error, you should:
* First, check to see if the request was otherwise successful, to make sure the CORS issue is the real issue.
* Second, look into fixing the server-side CORS headers, NOT into setting mode 'no-cors'.

## Cross Origin Resource Blocking (CORB)

A more recent addition to browser security, CORB handles the cases where the request returns a different content-type than the call was expecting (e.g. you request `application/json`, but get `text/html`)  Like with CORS, the response will not be made available. 

This can show up when a browser returns a 404 HTML page (as an example) or if you didn't specify the correct 'accepts' header in your request.

## Content-Security Policy (CSP)

CORS is a set of headers in a service response that tell the browser about which pages are allowed to interact with that service endpoint (and how).  CSP is a set of headers on a _page_ response that tell the browser about what sort of dynamic behaviors the page allows.  CORS is handled by the service endpoint authors, while CSP is handled by the source of that page.  Some servers will have that be a server-wide configuration while others manage the headers for each page-load endpoint differently, just as some pages are dynamic and some are static.


