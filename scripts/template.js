function templateRenderPokemon(detailpokemon){
    return `
        <div class="card m-1" onclick="ShowPokemonById(${detailpokemon.id})">
            <div class="card-header bg-secondary text-white">
                <span class="fst-normal fs-6">
                    #${detailpokemon.id} - ${detailpokemon.name.toUpperCase()}
                </span>
            </div>
            <div class="card-body ${detailpokemon.types[0]?.type.name} ">
                <img src="${detailpokemon.sprites.front_default}" class="card-img-top image" alt=" pokemon image" onerror="this.onerror=null;this.src='./img/pokemon_logo.png';">
            </div>
            <div class="card-body text-center bg-info-subtle">
                ${detailpokemon.types.map((type) =>  
                    `<span class="badge text-bg-primary">${type.type.name}</span>`
                ).join(' ')}
            </div>
        </div>
    `;
}

function templateRenderDetailPokemon(detailpokemon){
    return `
        <div class="contain" onclick="close_popup(event)">
            <div class="modale" onclick="stop_event(event)">
                <div class="">
                    <button class="" type="button" data-bs-slide="prev" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" aria-label="Previous" style="border: none; background-color: transparent;" onclick="prev(${detailpokemon.id}, event)">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                </div>
                <div class="bg-secondary p-3">
                    <div class="modal-header">
                        <h5 class="modal-title fs-5" >#${detailpokemon.name.toUpperCase()}</h5>
                        <button type="button" class="btn-close" onclick="close_popup(event)"></button>
                    </div>
                    <div class=" modal_image d-flex justify-content-center ${detailpokemon.types[0]?.type.name}">
                        <img src="${detailpokemon.sprites.front_default}" class="card-img-top image" alt=" pokemon image" onerror="this.onerror=null;this.src='./img/pokemon_logo.png';">
                    </div>
                    <div class="content-pokemon">
                        <div class="row show_element " id="show_element">
                            <div class="col-12 col-sm-4 " id="mainInfo">
                                <h3> Main Info</h3>
                                <p>Height : <span class="badge text-bg-primary">${detailpokemon.height} m</span></p>
                                <p>Weight : <span class="badge text-bg-warning ">${detailpokemon.weight} Kg</span></p>
                                <p>Rang : <span class="badge text-bg-light ">${detailpokemon.order} </span></p>
                                <p>Base Exp : <span class="badge text-bg-success ">${detailpokemon.base_experience} XP</span></p>
                            </div>
                            <div id="elevolution" class="col-12 col-sm-4 ">
                                <h3> Abilities</h3>

                                ${detailpokemon.abilities.map((type) =>  
                                    `<span class="badge text-bg-danger">${type.ability.name}</span>`
                                ).join(' ')}
                            </div>
                            <div id="stats" class="col-12 col-sm-4 ">
                                <h3> Stats</h3>
                                
                                ${detailpokemon.stats.map((type) =>  
                                `<span class="badge text-bg-info">${type.stat.name}</span>`
                                ).join(' ')}
                
                            </div>
                        </div>           
                    </div>
                </div>
                <div>
                    <button class="" type="button"  data-bs-slide="next" style="border: none; background-color: transparent;" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" aria-label="Next" onclick="next(${detailpokemon.id}, event)">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}
