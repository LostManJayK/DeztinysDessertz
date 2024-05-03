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

    //Retrieve the menu_list element
    menu_list = document.getElementById('menu_list');

    //Convert the string into a JSON compatible string
    menu_data = menu_data.replace(/'/g, '"');
    menu_data = menu_data.replace(/\(/g, '[');
    menu_data = menu_data.replace(/,\)/g, ']');
    menu_data = menu_data.replace(/\)/g, ']');

    //Parse the string as JSON data
    try 
    {
        menu_data = JSON.parse(menu_data);
    }
    catch (error) 
    {
        console.error("Error parsing JSON:", error);
    }

    menu_data['MenuItems'].forEach(item => 
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
        item_content.appendChild(name_header);

        //Add the form element with appropriate class, id, name, action and method
        let item_form = document.createElement('form');
        item_form.classList.add('menu_item_options');

        //Select appropriate id based on the item name
        switch(item)
        {
            case "Cakes":
                item_form.id = "cake_options";
                break;

            case "Cupcakes":
                item_form.id = "cupcake_options";
                break;
            
            case "Dipped Dessertz":
                item_form.id = "dipped_dessert_options";
                break;
            
            case "Other Dessertz":
                item_form.id = "other_dessert_options";
                break;
                
            default:
                let new_id = item.toLowerCase();
                new_id = new_id.replaceAll(' ', '_');
                new_id = new_id.slice(0, -1);
                item_form.id = new_id+"_optoins";
                break;
        }

        //Name matches id
        item_form.name = item_form.id;

        //Set method and action
        item_form.method = "POST";
        item_form.action = "/add_to_cart/";

        //Add csrf token to the form
        csrf_input = document.createElement('input');
        csrf_input.type = 'hidden';
        csrf_input.name = 'csrfmiddlewaretoken';
        csrf_input.value = csrfToken;
        item_form.appendChild(csrf_input);

        //Append to item_content element
        item_content.appendChild(item_form);


        //Add the appropriate options into the form

        //Define appropriate options table for each item
        let options_table = {

            'Cakes' : 'CakeOptions',
            'Cupcakes' : 'CupcakeOptions',
            'Dipped Dessertz' : 'DippedDessertOptions',
            'Other Dessertz' : 'OtherDessertOptions',
            'Something else?' : 'RequestOptions'
        };

        item_option_table = options_table[item];

        //Iterate through the options table
        menu_data[item_option_table].forEach(option =>
        {

            //Create option holder seciton
            let section = document.createElement('section');
            section.classList.add("option_holder");
            item_form.appendChild(section);

            //Creaete label for select element
            let label = document.createElement('label');
            label.setAttribute("for", option[1]);
            label.innerHTML += option[0];
            section.appendChild(label);

            if(option[2])
            {                //Create select element
                let select = document.createElement('select');
                select.classList.add("order_spec");
                select.name = option[0];
                select.id = option[1];
                select.setAttribute("form", item_form.id);
                select.required = true;
                section.appendChild(select);
                
                if(option[2] == 'CakeTypes')
                {
                    //Create optgroups for cakes
                    var optgroup_cake = document.createElement('optgroup');
                    optgroup_cake.label = "Cakes";
                    select.appendChild(optgroup_cake);
                    //Create optgroups for cheesecakes
                    var optgroup_cheesecake = document.createElement('optgroup');
                    optgroup_cheesecake.label = "Cheesecakes";
                    select.appendChild(optgroup_cheesecake);
                }

                //Populate select elements
                menu_data[option[2]].forEach(selection =>
                {
                    //Create the option element for the current selection
                    opt = document.createElement('option');

                    try
                    {
                        opt.value = selection.toLowerCase();
                    }
                    catch(err)
                    {
                        opt.value = selection;
                    }

                    opt.innerHTML += selection;

                    //Create the Cake Type specific logic
                    if(option[2] == "CakeTypes")
                    {
                        //Add the selection into the appropriate optgroup
                        if(selection.includes("Cheesecake"))
                        {
                            optgroup_cheesecake.appendChild(opt);
                        }
                        else
                        {
                            optgroup_cake.appendChild(opt);
                        }
                    }
                    //If the option isn't cake types, add the current selection directly into the select element
                    else
                    {
                        select.appendChild(opt);
                    }


                    if(selection === 'Other')
                    {
                        let input = document.createElement('input');
                        input.id = 'other_' + option[1];
                        input.classList.add('order_spec');
                        input.type = 'text';
                        input.placeholder = option[0];
                        section.appendChild(input);
                    }
                });
            }
            else
            {
                let input = document.createElement('input');
                input.id = option[1];
                input.classList.add('order_spec');
                input.type = 'text';
                input.placeholder = 'Dessert  Name'
                section.appendChild(input);
            }
        });

        //Create the note element for each menu item and fill in the appropriate attributes
        let note = document.createElement('textarea');
        note.id = item.toLowerCase().replaceAll(' ', '_').slice(0, -1) + "_notes";
        note.name = item + "Notes";
        note.classList.add("order_spec", "note_area");
        note.placeholder = "Add any specific details we would need here! (Specific flavours, design, diertary restrictions, etc..)";

        //Creaete label for select element
        let label = document.createElement('label');
        label.setAttribute("for", note.id);
        label.classList.add("note_label");
        label.innerHTML += "Notes";

        let section = document.createElement('section');
        section.classList.add("option_holder");
        item_form.appendChild(section);

        section.appendChild(label);
        section.appendChild(note);

        //Create the add to cart button
        button = document.createElement("button");
        button.id = item.toLowerCase()+"submit";
        button.classList.add("menu_submit");
        button.innerHTML += "Add to Cart";
        item_form.appendChild(button);
        
    });
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
        this.element.style.height = (this.element.scrollHeight+250) + 'px';
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
                console.log(spec.value.trim());
                requiredFilled = false;
                spec.style.borderColor = 'red';
                otherOption = false;
                return;
            }
            else
            {
                spec.style.borderColor = '';
                otherOption = false;
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
                    console.log(response);
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