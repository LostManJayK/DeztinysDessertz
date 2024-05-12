//Parse image filename json data
img_filenames = img_filenames.replace(/'/g, '"');
img_filenames = JSON.parse(img_filenames);

//Set initial gallery image
gallery_img = document.getElementById('gallery_img');
gallery_img.src = gallery_path + img_filenames[0];

//Define variables needed for navigation
let img_pos = 0;
let num_imgs = img_filenames.length;
let new_index = 0;


//Change the displayed photo in the gallery
function changePhoto(direction)
{

    //Adjust img position based on button clicked
    if(direction == 'right')
        img_pos++;
    else
        img_pos--;

    //Assign the new image index
    new_index = (img_pos % num_imgs + num_imgs) % num_imgs;

    gallery_img.src = gallery_path + img_filenames[new_index];
}

//Define navigation button objects
let left_btn = document.getElementById('left_btn');
let right_btn = document.getElementById('right_btn');

//Set onclick listeners for navigation buttons
left_btn.onclick = function(){changePhoto('left');};
right_btn.onclick = function(){changePhoto('right');};

//Set gallery img height to match width
let gallery_img_holder = document.getElementById('gallery_img_holder');
gallery_img_holder.style.height = (0.56 * gallery_img_holder.offsetWidth) + 'px';