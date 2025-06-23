function templateRenderPokemon(detailpokemon){
    return `
        <div class="card text-bg-dark m-1" data-bs-toggle="modal" data-bs-target="#Modal${detailpokemon.id}">
            <div class="card-header bg-secondary">
                #${detailpokemon.id} - ${detailpokemon.name}
            </div>
            <div class="card-body bg-light">
                <img src="${detailpokemon.sprites.front_default}" class="card-img-top" alt=" pokemon image">
            </div>
            <div class="card-body">
                ${detailpokemon.types.map((type) =>  
                    `<span class="badge text-bg-primary">${type.type.name}</span>`
                ).join(' ')}
                
            </div>
        </div>



        <div class="modal fade" id="Modal${detailpokemon.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm modal-dialog-centered d-flex justify-content-center">
                    <div class="modal-content bg-secondary">
                        <div class="modal-header">
                            <h1 class="modal-title fs-2" id="exampleModalLabel">#${detailpokemon.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body modal_image bg-warning d-flex justify-content-center">
                            <img src="${detailpokemon.sprites.front_default}" class="card-img-top" alt=" pokemon image">
                        </div>
                        <div class="modal-body">
                            <span class="badge text-bg-primary">${detailpokemon.height} m</span>
                            <span class="badge text-bg-success">${detailpokemon.weight} Kg</span> <br>

                                        
                        </div>
                    </div>
                </div>
            </div>

      
      `;
}
