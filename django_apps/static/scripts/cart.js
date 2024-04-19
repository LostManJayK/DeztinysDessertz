json_data = json_data.replaceAll("'", '"');

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

//Remove the appropriate item from the cart and update the display
function removeFromCart(target)
{

    console.log('Removing from cart...');
    // event.preventDefault();

    let rm_btn = target;
    let btn_id = rm_btn.id;
    let item_index = btn_id[btn_id.length - 1];

    fetch('/remove_from_cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(
            {'item_index' : item_index}
        ),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Item removed successfully:', data);
        // Optionally, you can perform additional actions after the order is submitted
    })
    .catch(error => {
        console.error('Error removing item:', error);
    });

    location.reload();

}

try 
{
    json_data = JSON.parse(json_data);
} 
catch (error) 
{
    console.error("Error parsing JSON:", error); // Log any parsing errors
}

let item_list = document.getElementById('order_items');

let item_count = 0; //Initialize item counter for cart

for (const item of json_data)
{
    item_count++; //Increment cart count

    item_list.innerHTML += '<div id="item' + item_count + '" class="order_item"></div>'; //Create a container to display the cart items

    let current_item = document.getElementById('item' + item_count);  //Store the current item container

    current_item.innerHTML += '<button type="button" class="remove_cart_btn" id="rm_btn' + item_count + '">X - Remove</button>'; //Add remove from cart button to container


    //Access the created button and add onlcick listener
    let rm_btn = document.getElementById("rm_btn" + item_count);

    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('remove_cart_btn')) {
            removeFromCart(event.target);
        }
    });

    current_item.innerHTML += '<h2>' + 'Item ' + item_count +  ' - ' + item['Name'] + '</h2>';

    for(const detail in item)
    {
        if(detail != 'Name')
            current_item.innerHTML += '<p>' + detail + ': ' + item[detail] + '</p>';
    }

}
