function templateRenderPokemon(detailpokemon){
    return `
        <div class="card text-bg-dark m-1" data-bs-toggle="modal" data-bs-target="#Modal${detailpokemon.id}">
            <div class="card-header bg-secondary">
                #${detailpokemon.id} - ${detailpokemon.name}
            </div>
            <div class="card-body ${detailpokemon.types[0]?.type.name} ">
                <img src="${detailpokemon.sprites.front_default}" class="card-img-top image" alt=" pokemon image">
            </div>
            <div class="card-body text-center">
                ${detailpokemon.types.map((type) =>  
                    `<span class="badge text-bg-primary">${type.type.name}</span>`
                ).join(' ')}
                
            </div>
        </div>



        <div class="modal fade" id="Modal${detailpokemon.id}" tabindex="-1" aria-labelledby="Modal" aria-hidden="true">
                <div class="modal-dialog modal-m modal-dialog-centered d-flex justify-content-center">
                    <div class="modal-content bg-secondary">
                        <div class="modal-header">
                            <h1 class="modal-title fs-2" id="exampleModalLabel">#${detailpokemon.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body modal_image d-flex justify-content-center ${detailpokemon.types[0]?.type.name}">
                            <img src="${detailpokemon.sprites.front_default}" class="card-img-top image" alt=" pokemon image">
                        </div>
                        <div class="modal-body">
                            <div class="row show_element " id="show_element">
                                <div class="col-4" id="mainInfo">
                                    <h3> Main Info</h3>
                                    <p>Height : <span class="badge text-bg-primary">${detailpokemon.height} m</span></p>
                                    <p>Weight : <span class="badge text-bg-warning ">${detailpokemon.weight} Kg</span></p>
                                    <p>Rang : <span class="badge text-bg-light ">${detailpokemon.order} </span></p>
                                    <p>Base Exp : <span class="badge text-bg-success ">${detailpokemon.base_experience} XP</span></p>
                                </div>
                                <div id="elevolution" class="col-4">
                                    <h3> Abilities</h3>
                                    
                                    ${detailpokemon.abilities.map((type) =>  
                                        `<span class="badge text-bg-danger">${type.ability.name}</span>`
                                    ).join(' ')}
                                </div>
                                <div id="stats" class="col-4">
                                    <h3> Stats</h3>
                                    ${detailpokemon.stats.map((type) =>  
                                    `<span class="badge text-bg-info">${type.stat.name}</span>`
                                    ).join(' ')}
                                </div>
                            </div>           
                        </div>
                    </div>
                </div>
            </div>
      `;
}
