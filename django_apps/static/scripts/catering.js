//Get the appropriate cookie id
/*
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
*/



function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
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


function sendCateringRequest()
{   

    console.log('Sending request');

    let catering_details;
    catering_details= document.getElementById('description').value;

    let customer_object = {};
    let requiredFilled = true;

    customer_info = document.querySelectorAll('.customer_detail');
    customer_info.forEach(detail =>
    {

        if(detail.hasAttribute('required') && !detail.value.trim()) 
        {
            console.log('NOPE');
            requiredFilled = false;
            detail.style.borderColor = 'red';

            return;
        }
        else if(detail.id == 'email' && !isValidEmail(detail.value.trim()))
        {
            requiedFilled = false;
            detail.style.borderColor = 'red';
            window.alert('Invalid email format');
            return;
        }
        else if(detail.id == 'phone' && !isValidPhone(detail.value.trim()))
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

    if(requiredFilled)
    {
        let catering_object = {"customer_info" : customer_object, "catering_details" : catering_details};

        fetch('/send_catering_request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(catering_object),
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
        })
        .catch(error => {
            console.error('Error submitting order:', error);
        });
    }
    else
    {
        document.documentElement.scrollTop = 0;
        window.alert("Please ensure all highlighted fields are filled");
    }

        
}

submit_btn = document.getElementById('submit_req');

submit_btn.addEventListener("click", sendCateringRequest);
