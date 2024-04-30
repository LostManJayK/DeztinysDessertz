//Get the appropriate cookie id
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


//Render the menu item with the appropriate options
function renderMenu()
{
    menu_list = document.getElementById('menu_list');

    menu_items = menu_items.replaceAll("'", '"');

    try 
    {
        menu_items = JSON.parse(menu_items);
    }
    catch (error) 
    {
        console.error("Error parsing JSON:", error);
    }

    menu_items.forEach(item => 
    {

        //Create a new list item, add appropriate class name, and add to menu list
        let li = document.createElement('li');
        li.classList.add("menu_item");
        menu_list.appendChild(li);

        //Create the image element for the menu item, add the source and add to list element
        let img = document.createElement('img');
        img.src = img_urls[item];
        li.appendChild(img);

        //Create the div holder for the menu item content and add to list element
        let item_content = document.createElement('div');
        item_content.classList.add("menu_item_content");
        li.appendChild(item_content);

        //Add header(2) element and add to item content
        let name_header = document.createElement('h2');
        name_header.innerHTML += item;

        //Add the form element with appropriate class, id, name, action and method

    })
}


renderMenu();

const itemsArr = document.getElementsByClassName("menu_item");
const numItems = itemsArr.length;



//Create a custom class for menu items which inlcudes their expand and contract methods as well as other relevant properties
class MenuItem
{

    //Initial height and width of the menu item elements
    static #startHeight = itemsArr[0].offsetHeight;
    static #startWidth = itemsArr[0].querySelector('h2').offsetWidth;

    //Constructor
    constructor(element)
    {
        this.element = element; //Refers to the actual menu item element
        this.elementImg = element.querySelector('img'); //The image in each menu item
        this.elementContent = element.querySelector('.menu_item_content');//The header text in each menu item
        this.elementOptions = this.elementContent.querySelector('.menu_item_options');
        this.isExpanded = false; //Tracks whether the item is expanded or contracted
        this.name = this.elementContent.querySelector('h2').innerHTML; //Name of menu item

        this.order_specs = element.querySelectorAll('.order_spec'); //List of elements containing user input
        this.add_cart_btn = element.querySelector('.menu_submit'); //Menu item add to cart button
    }

    //Expand the menu item
    #expand()
    {
        //this.element.style.height = 75 + 'vh';
        this.element.style.height = (this.element.scrollHeight+200) + 'px';
        this.elementContent.style.width = 100 + '%';
        this.isExpanded = true;
        this.element.style.flexWrap = "wrap";
        this.elementOptions.style.visibility = "visible";
        this.elementContent.style.cursor = "default";
    }

    //Collapse the menu item
    #collapse()
    {
        this.element.style.height = (MenuItem.#startHeight) + "px";
        this.elementContent.style.width = MenuItem.#startWidth + "px";
        this.isExpanded = false;
        this.element.style.flexWrap = "nowrap";
        this.elementOptions.style.visibility = "hidden";
        this.elementContent.style.cursor = "pointer";
    }

    //When clicked, if the element is expanded, collapse it and vice versa. If the menu area is clicked while expanded, ignore
    headerClick()
    {
        if(!this.isExpanded)
        {
            this.#expand();
        }
    }

    imgClick()
    {
        if(this.isExpanded)
        {
            this.#collapse();
        }
        else
        {
            this.#expand();
        }
    }

    optionSelect()
    {
        console.log("Item Selected!");
    }


    //Add specified item to the cart
    addToCart()
    {

        let itemObject = {"Name" : this.name};
        let requiredFilled = true;
        let otherOption = false;

        //Add order information into an object
        this.order_specs.forEach(spec =>
        {

            if(spec.value == 'other')
            {
                otherOption = true;
            }
            else if((spec.hasAttribute('required') || otherOption) && !spec.value.trim())
            {
                requiredFilled = false;
                spec.style.borderColor = 'red';
                otherOption = false;
                return;
            }
            else
            {
                spec.style.borderColor = '';
            }

        });


        if(requiredFilled)
        {
            this.order_specs.forEach(spec =>
            {
                if(!(spec.id == 'num_tiers' && itemObject['cake_type'] != 'tiered'))
                {
                    itemObject[spec.id] = spec.value;
                }
                
            })
        

            fetch('/add_to_cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(itemObject),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Order submitted successfully:', data);
                // Optionally, you can perform additional actions after the order is submitted
            })
            .catch(error => {
                console.error('Error submitting order:', error);
            });
        }
    }
    
}

//Create an array of items using the defined class
let items = []

for(let i=0; i<numItems; i++)
{
    items[i] = new MenuItem(itemsArr[i]);
}



//Set the onlcik listeners
for(let i=0; i<numItems; i++)
{
    items[i].elementImg.style.cursor = 'pointer';
    items[i].elementContent.style.cursor = 'pointer';
    items[i].elementContent.onclick = function(){items[i].headerClick();};
    items[i].elementImg.onclick = function(){items[i].imgClick();};
    items[i].add_cart_btn.onclick = function(event){
        event.preventDefault();
        items[i].addToCart();};
}