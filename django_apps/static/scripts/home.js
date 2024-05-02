//Access the order button
const orderButton = document.getElementById("main_home_photo");

//Set the default value for the text width to 0
if(window.innerWidth > 900)
{
    orderButton.querySelector("#order_text").style.width = 0;
}


//Store the original width of the container and shrink the container to 2/3 size
const startWidth = orderButton.offsetWidth;
orderButton.style.width = (startWidth * (2/3)) + 'px';

//Create a hover listener with a timer

let expandTimer = null;
let contractTimer = null;
orderButton.onmouseenter = function()
{
    clearInterval(expandTimer);
    clearInterval(contractTimer);
    expandTimer = setInterval(orderHover, 1, orderButton, startWidth);
};

orderButton.onmouseleave = function()
{
    clearInterval(contractTimer);
    clearInterval(expandTimer);
    contractTimer = setInterval(orderUnhover, 1, orderButton, startWidth);
};



//Expand the button on hover
function orderHover(el, el_width)
{
    if(window.innerWidth > 900)
    {
        clearInterval(contractTimer);

        if(el.offsetWidth < el_width)
        {
            el.style.width = (el.offsetWidth+2) + 'px';
        }
    
        if(el.querySelector("#order_text").offsetWidth < el_width/3)
        {
            el.querySelector("#order_text").style.width = (el.querySelector("#order_text").offsetWidth+3) + 'px';
        }
    
        if(el.offsetWidth == el_width && el.querySelector("#order_text").offsetWidth == el_width/3)
        {
            clearInterval(expandTimer);
        }
    }


}

//Collapse the button on exit
function orderUnhover(el, el_width)
{
    if(window.innerWidth > 900)
    {
        clearInterval(expandTimer);

        if(el.offsetWidth > el_width * (2/3))
        {
            el.style.width = (el.offsetWidth-5) + 'px';
        }
    
        if(el.querySelector("#order_text").offsetWidth > 0)
        {
            el.querySelector("#order_text").style.width = (el.querySelector("#order_text").offsetWidth-3) + 'px';
        }
        if(el.offsetWidth == el_width * (2/3) && el.querySelector("#order_text").offsetWidth == 0)
        {
            clearInterval(contractTimer);
        }
    }
}




