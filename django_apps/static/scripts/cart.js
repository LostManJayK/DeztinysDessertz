let item_count = 0; //Initialize item counter for cart

//Get the appropriate cookies
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
        location.reload();
    })
    .catch(error => {
        console.error('Error removing item:', error);
    });

}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;

function isValidEmail(email)
{
    return emailRegex.test(email);
}

function isValidPhone(phone)
{
    return phoneNumberRegex.test(phone) || phone == '';
}


function submitOrder()
{   
    if(item_count == 0)
    {
        window.alert("Cart is empty...");
        return;
    }

    let customer_object = {};
    let requiredFilled = true;
    let tos_agree = document.getElementById('tos_agree');

    customer_info = document.querySelectorAll('.customer_detail');
    customer_info.forEach(detail =>
    {
        if(detail.hasAttribute('required') && !detail.value.trim())
        {
            requiredFilled = false;
            detail.style.borderColor = 'red';
        }
        else if(detail.id == 'email' && !isValidEmail(detail.value.trim()))
        {
            requiedFilled = false;
            detail.style.borderColor = 'red';
            window.alert('Invalid email format');
            return;
        }
        else if(detail.id == 'phone' && !isValidPhone)
        {
            requiredFilled = false;
            detail.style.borderColor = 'red';
            window.alert('Invalid phone format');
            return;
        }

        else
        {
            detail.style.borderColor = '';
        }

        console.log(detail.id);
        
        if(detail.id == 'date')
        {
            let month_arr = [
                "January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"
            ];
            let date_info = detail.value.split('-');
            let year = date_info[0];
            let month = Number(date_info[1]);
            month = month_arr[month-1];
            let day = date_info[2];
            customer_object[detail.id] = `${month} ${day}, ${year}`;
        }
        else
        {
            customer_object[detail.id] = detail.value;
        }
    })



    if(requiredFilled && tos_agree.checked)
    {
        tos_agree.parentNode.style.Color = '';

        fetch('/submit_order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(customer_object),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order submitted successfully:', data);
            window.location.href = '/confirmation/';
            //location.reload();
        })
        .catch(error => {
            console.error('Error submitting order:', error);
        });
    }
    else
    {
        tos_agree.parentNode.style.Color = 'red';
        document.documentElement.scrollTop = 0;
        window.alert("Please ensure all highlighted fields are filled & Terms of Service have been accepted.");
    }
        
}


function renderCart()
{

    json_data = json_data.replaceAll("'", '"');
    console.log("JSON DATA: " + json_data);

    try 
    {
        json_data = JSON.parse(json_data);
        console.log(json_data);
    } 
    catch (error) 
    {
        console.error("Error parsing JSON:", error); // Log any parsing errors
    }

    let item_list = document.getElementById('order_items');


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

            if(detail.includes('Notes'))
            {
                current_item.innerHTML += '<p class="p_note">' + detail + ':<br>' + item[detail].replaceAll('\n', '<br>') + '</p>';
            }
            else if(detail != 'Name')
            {
                current_item.innerHTML += '<p>' + detail + ': ' + item[detail] + '</p>';
            }
        }

    }
}

renderCart();

submit_btn = document.getElementById("submit_order");
submit_btn.onclick = function(event){
    event.preventDefault();
    submitOrder();
};
