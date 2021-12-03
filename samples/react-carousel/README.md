This is VERY SIMPLE Image Carousel in response to a request 
- Remember, Carousels are usually (if not always) a bad idea in terms of UX
  - This is included only because you may be asked to do one at work
  - And I understand that they can be visually impressive and this makes them arguably good portfolio pieces
    - Just make sure you understand the issues they have
- This is a very, very basic example.  Some features you might want to add:
  - Making the buttons transparent overlays over the slides instead of at the sides
    - make sure they can still get focus and be visible then
  - a tab-like control of dots/thumbnails/titles allowing you to:
    - See how many slides there are
    - Jump directly to a given slide
    - See which slide is active
  - visual "slide-in" effect
    - Definitely a CSS exercise!  
    - I'd approach it by having an animation that started with the image offscreen with translateX, then showed it sliding in to the actual position
      - this would involve fighting with the positioning and visibility to make sure the container maintained the right size

