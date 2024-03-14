const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollBar = document.querySelector(".container .slider-scrollbar");
    const ScrollbarThumb = sliderScrollBar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    //Handle scrollbar thumb drag
    ScrollbarThumb.addEventListener("mousedown",(e)=> {
        const startX = e.clientX;
        const thumbPosition = ScrollbarThumb.offsetLeft;

        //update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX -startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width- ScrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition,newThumbPosition));

            //slide image width with scroll thumb
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            ScrollbarThumb.style.left =`${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        //remove event lisener on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        //add event Listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    })

    //slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" }); 
        });
    });

    // hide scroll button related to beginning/end of an element
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <=0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    //move scroll bar related to image moves
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - ScrollbarThumb.offsetWidth);
        ScrollbarThumb.style.left = `${thumbPosition}px`; 
    }

    imageList.addEventListener("scroll", ()=> {
        handleSlideButtons();
        updateScrollThumbPosition();
    });




}


window.addEventListener("load", initSlider);

