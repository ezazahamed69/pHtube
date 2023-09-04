let currentId = "1000";
const catagoryHandle = async () => 
{
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    //    Category 
    const tab = document.getElementById("tab");
    data.data.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="load('${category.category_id}')" class="tabs tabs-boxed m-3
        p-3 text-lg font-light "> ${category.category} </a> 
        `;
        tab.appendChild(div);

    });

};
//  Sort By View
const sortView = async (categoryid) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryid}`);
    const data = await res.json();
    const videos = data.data;
    

    videos.sort((a, b) => {
        const firstOne = parseInt(a.others.views.replace("k", ""));
        const secondOne = parseInt(b.others.views.replace("k", ""));
        return secondOne - firstOne;
    });

    // No content code here
    const cardContainer = document.getElementById("card");
    cardContainer.innerHTML = "";

    if (data.status == false){
        const div = document.createElement("div");
        div.innerHTML = `
        <img class="mx-auto" src="./Icon.png">  
        <br>
        <h1 class="text-5xl font-semibold ">Sorry, No content available here </h1>
        `;

        div.classList.add("col-span-1", "md:col-span-2", "lg:col-span-4", "place-self-center")

        cardContainer.appendChild(div);
    }

    videos.forEach((video) => 
    {
        const div = document.createElement("div");
        div.innerHTML = `
             <div class="card w-80 bg-base-100">

                <figure class="px-4 pt-4">
                    <img src="${video.thumbnail}" class="rounded-2xl w-[312px] h-[200px]" />

                </figure>
                <div class="card-body text-center">
                    <div class="flex justify-left gap-4">
                        <img src="${video.authors[0].profile_picture}" class="rounded-2xl h-8 w-10" />
                        <h3 class="card-title font-bold"> ${video.title}
                        </h3>
                    </div>
                </div>
                
                <div class="ml-20 -mt-8 text-left">
                    <div class="flex justify-left gap-4 items-center">
                        <p> ${video.authors[0].profile_name} </p>
                        <p class="h-8 w-5"> ${
                            video.authors[0]?.verified ? 
                            `<img src="./verifyPic.png">` : " "
                        } </p>
                    </div>
                    
                    <p > ${video.others.views} Views </p>
                </div>

            </div>
        `;
        cardContainer.appendChild(div);
    });
};

const load = async (categoryid) => 
{
    currentId = categoryid;

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryid}`);
    const data = await res.json();
    const videos = data.data;

    const cardContainer = document.getElementById("card");
    cardContainer.innerHTML = "";
    
    if (data.status == false){
        const div = document.createElement("div");
        div.innerHTML = `
        <img class="mx-auto" src="./Icon.png">  
        <br>
        <h1 class="font-medium text-5xl"> Sorry, No content available here </h1>
        `;
        div.classList.add("col-span-1", "md:col-span-2", "lg:col-span-4", "place-self-center")
        cardContainer.appendChild(div);
    }
    videos.forEach(video => {
         
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-80 bg-base-100">
            <figure class="px-4 pt-4">
            <img src="${video.thumbnail}" class="rounded-2xl w-[312px] h-[200px]" />
            </figure>
            <div class="card-body text-center">
                <div class="flex justify-left gap-4">
                    <img src="${video.authors[0].profile_picture}"class="rounded-full w-10 h-10" />

                    <h2 class="card-title font-bold"> ${video.title}</h2>
                </div>
            
            </div>
            <div class="text-left ml-24 -mt-8">

                <div class="flex gap-4 justify-left items-center">
                    <p> ${video.authors[0].profile_name} </p>
                    <p class="h-7 w-7"> ${video.authors[0]?.verified ? `<img src="./verifyPic.png">` : ' '}  </p>
                </div>
                <p > ${video.others.views} Views </p>
            </div>   
      </div>
        `;
        cardContainer.appendChild(div);

    })


};

const sBtn = document.getElementById("sort");


    sBtn.addEventListener("click", () => 
    
    {
    
   sortView(currentId);
}
);

catagoryHandle();

load(currentId);

