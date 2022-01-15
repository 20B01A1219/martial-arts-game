let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");

let loadimage = (src, callback)=>{
    let img = document.createElement("IMG");
    img.onload = () => callback(img);
     img.src = src;
}

let imagepath=(framenumber,animation) =>
{
    return "images/"+animation+"/"+framenumber+".png"
}
let frames = {
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7],
    punch : [1,2,3,4,5,6,7],
    forward : [1,2,3,4,5,6],
    backward : [1,2,3,4,5,6],
    block :[1,2,3,4,5,6,7,8,9]
}

let loadImages = (callback)=>
{
    let images = {idle : [], kick : [], punch : [], forward : [], backward :[], block :[]};
    let imagesToLoad = 0;
    ["idle", "kick", "punch","forward", "backward","block"].forEach((animation)=>{
        let animationframes = frames[animation]
        imagesToLoad = imagesToLoad + animationframes.length;
       animationframes.forEach((framenumber)=>{
        let path = imagepath(framenumber,animation);
        loadimage(path, (image)=>{
            images[animation][framenumber - 1] = image;
            imagesToLoad = imagesToLoad - 1;
    
            if (imagesToLoad === 0)
            {
                callback(images);
            }
        });
    });
 })
    
}
let animate = (ctx, images,animation,  callback)=>
{

    images[animation].forEach((image, index)=>{
        setTimeout(()=>{
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length* 100);
}
loadImages((images)=>{
    let queueanimations = [];
    
    let aux = () => {
        let selectedanimation;
        if (queueanimations.length === 0)
        {
            selectedanimation = "idle";
        }
        else
        {
            selectedanimation = queueanimations.shift();
        }
        animate(ctx, images, selectedanimation, aux)
    }
   
    document.getElementById('kick').onclick = function() {
        queueanimations.push("kick");
     }
     document.getElementById('punch').onclick = function() {
        queueanimations.push("punch");
     }
     document.getElementById('forward').onclick = function() {
        queueanimations.push("forward");
     }
     document.getElementById('backward').onclick = function() {
        queueanimations.push("backward");
     }
     document.getElementById('block').onclick = function() {
        queueanimations.push("block");
     }
     document.addEventListener('keyup', function(event) {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        if (key === "ArrowRight")
        {
            queueanimations.push("punch");
        }
        if (key === "ArrowUp")
        {
            queueanimations.push("forward");
        }
        if(key  === "ArrowLeft")
        {
            queueanimations.push("kick");
        }
        if(key  === "ArrowDown")
        {
            queueanimations.push("backward");
        }
        if(key === "B" || key === "b")
        {
            queueanimations.push("block");
        }
    });
     aux();
});
