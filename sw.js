


























































































































<script>

    function gitdata()
    {
        var url = 'https://api.github.com/users/'+document.getElementById('text_input').value;
         
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            console.log(data.avatar_url)
            var im = document.getElementById("image");
            im.setAttribute("src",data.avatar_url);

            var gi = document.getElementById('para');
            gi.innerHTML=JSON.stringify(data);

        })

        .catch(function(reponse){
            return response.status;
            console.log(response.status);
        });;
    }

</script>







(function ()
{

    self.addEventListener('install', event =>{
        console.log('service worker is installing');

        event.waitUntil(
            caches
            .open('PWD_app')
            .then(cache => 
                caches.addAll([
                    '/git'
                ])
                )
        )
        self.skipWaiting();
    })

    self.addEventListener('activate',event=>{
        event.waitUntil(caches.delete('PWD_app'));
        console.log('service worker is activating'); 
    })

    self.addEventListener('fetch', event=>{
        console.log('fetching', event.request.url);
        event.respondWith(
            
            caches.match(event.request).then(async (response)=> 
            {
                if(response){
                    return response
                }
                 
            let data = fetch(event.request);
            let data_clone = (await data).clone();
            event.waitUntil(caches.open('PWD_app').then(cache => cache.put(event.request,data_clone)));
            return data

            })
        )
    })
}
)
