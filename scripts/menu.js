//Check if the cursor has entered a menu item
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
        this.name = this.elementContent.innerHTML; //Name of menu item
    }

    
    //Expand the menu item
    #expand()
    {
        this.element.style.height = 75 + 'vh';
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

    //When clicked, if the element is expanded, collapse it and vice versa
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
}

//Define behaviour for cake options
let cakeTypeOptions = document.getElementById('cake_type').querySelector('option');
cakeTypeOptions.onselect = function(){console.log('Hello!')};
console.log(cakeTypeOptions);