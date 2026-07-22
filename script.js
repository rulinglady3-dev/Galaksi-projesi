// =======================
// MYSTIC FOREST
// =======================


// CANVAS

const canvas = document.querySelector("#forest");



// SCENE

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050811);


// SİS

scene.fog = new THREE.FogExp2(
    0x111522,
    0.025
);



// CAMERA

const camera = new THREE.PerspectiveCamera(

    75,

    window.innerWidth / window.innerHeight,

    0.1,

    2000

);


camera.position.set(
    0,
    3,
    10
);



// RENDERER

const renderer = new THREE.WebGLRenderer({

    canvas:canvas,
    antialias:true

});


renderer.setSize(

    window.innerWidth,
    window.innerHeight

);





// =======================
// LIGHT
// =======================


const moonLight = new THREE.DirectionalLight(

    0xbfd8ff,

    1.5

);


moonLight.position.set(

    -10,
    20,
    5

);


scene.add(moonLight);



const ambientLight = new THREE.AmbientLight(

    0x334455,

    0.8

);


scene.add(ambientLight);





// =======================
// GROUND
// =======================


const ground = new THREE.Mesh(

    new THREE.PlaneGeometry(
        200,
        200
    ),

    new THREE.MeshStandardMaterial({

        color:0x101c12

    })

);


ground.rotation.x = -Math.PI/2;


scene.add(ground);






// =======================
// TREES
// =======================


function createTree(x,z){



    const trunk = new THREE.Mesh(

        new THREE.CylinderGeometry(

            0.3,
            0.5,
            5

        ),

        new THREE.MeshStandardMaterial({

            color:0x3b2415

        })

    );


    trunk.position.set(

        x,
        2.5,
        z

    );


    scene.add(trunk);





    const leaves = new THREE.Mesh(

        new THREE.SphereGeometry(

            2.5,
            16,
            16

        ),

        new THREE.MeshStandardMaterial({

            color:0x123d1c

        })

    );


    leaves.position.set(

        x,
        5.5,
        z

    );


    scene.add(leaves);


}



createTree(-8,-15);
createTree(8,-20);
createTree(-15,-35);
createTree(15,-40);
createTree(0,-55);







// =======================
// MOON
// =======================


const moon = new THREE.Mesh(

    new THREE.SphereGeometry(
        6,
        64,
        64
    ),

    new THREE.MeshBasicMaterial({

        color:0xf5f3d7

    })

);


moon.position.set(

    0,
    35,
    -100

);


scene.add(moon);






// =======================
// STARS
// =======================


const starGeometry =
new THREE.BufferGeometry();


const starPositions=[];


for(let i=0;i<5000;i++){


    starPositions.push(

        (Math.random()-0.5)*800,

        Math.random()*300,

        (Math.random()-0.5)*800

    );


}



starGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        starPositions,
        3

    )

);



const starMaterial =
new THREE.PointsMaterial({

    color:0xffffff,

    size:1

});



const stars = new THREE.Points(

    starGeometry,
    starMaterial

);


scene.add(stars);







// =======================
// FIREFLY PARTICLES
// =======================


const fireflies=[];



for(let i=0;i<200;i++){


    const firefly = new THREE.Mesh(

        new THREE.SphereGeometry(
            0.05
        ),

        new THREE.MeshBasicMaterial({

            color:0xfff3a0

        })

    );



    firefly.position.set(

        (Math.random()-0.5)*80,

        Math.random()*8+1,

        (Math.random()-0.5)*80

    );



    scene.add(firefly);


    fireflies.push(firefly);


}







// =======================
// ANIMATION
// =======================


function animate(){


    requestAnimationFrame(animate);



    // kamera ilerleme

    camera.position.z -=0.01;



    // kamera hafif dönüş

    camera.rotation.y =

    Math.sin(
        Date.now()*0.0003
    )
    *
    0.2;




    // yıldız hareketi

    stars.rotation.y +=0.0001;




    // ateş böcekleri

    fireflies.forEach((f,index)=>{


        f.position.y +=

        Math.sin(
            Date.now()*0.001+index
        )
        *
        0.002;


    });



    renderer.render(

        scene,
        camera

    );


}



animate();







// =======================
// RESIZE
// =======================


window.addEventListener(

"resize",

()=>{


camera.aspect =

window.innerWidth /
window.innerHeight;



camera.updateProjectionMatrix();



renderer.setSize(

window.innerWidth,
window.innerHeight

);



});
