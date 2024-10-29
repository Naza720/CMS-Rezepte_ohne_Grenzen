'use strict';

import settings from "./settings.js";
import dom from "./dom.js"

const render = {
    
    header(){
        let elHeader = settings.elements.header;
        const wrap =dom.create({
            type: 'div', 
            parent: elHeader,
            cssClassName: 'TopWrapp', 
            insert: 'append'
        })
        const pagTitle = dom.create({
            content: 'Rezepte ohne Grenzen', 
            type: 'h1', 
            parent: wrap,
            insert: 'append'
        })
        dom.create({
            type:'p',
            content: `<i class="fa-solid fa-utensils"></i>`,
            parent: pagTitle,
            cssClassName:'logo',
            insert: 'prepend'
        })
        const nav = dom.create({ 
            type: 'nav', 
            parent: wrap,
            cssClassName: '', 
            insert: 'append'
        })
        const ul = dom.create({
            type:'ul',
            parent: nav, 
            cssClassName:'menu',
            insert:'append'
        })
        const menuItems = ["Home", "Rezepte", "Kontakt"];
        
        menuItems.forEach((item)=> {
            const liTag = dom.create({
                type: 'li',
                parent: ul,
                cssClassName:'liMenu',
                insert:'append'
              
            });
            const aTag = dom.create({
                content: item,
                type: 'a',
                parent: liTag,
                insert:'append',
                
            });
            if (item === "Home") {
                aTag.addEventListener('click', () => {
                    let elMain = settings.elements.main;
                    elMain.innerHTML = "";
                    render.createContainerInMain();
                    render.content();
                });
            }
            if (item === "Rezepte") {   
                const subMenu = dom.create({
                    type: 'ul',
                    parent: liTag,
                    cssClassName: 'submenu',
                    insert: 'append',
                    styles: {
                        display: 'none' 
                    }
                });

                const subMenuItems = ["Beilagen","Kuchen","Glutenfrei", "Deutsche Küche","Sandwiches","Portugiesische Küche", "Fleisch", "Salate", "Pasta", "Suppen", "Kalte Gerichte", "Mexikanische Küche",
                    "Vorspeisen","Fisch","Vegetarisch","Tapas","Spanische Küche","Abendessen","Backen","Reisgerichte","Italienische Küche","Mittagessen","Desserts","asiatische Küche","Frühstück",
                    "Meeresfrüchte","Kartoffeln"
                ];
                
                subMenuItems.forEach(subItem => {
                    const subLiTag = dom.create({
                        type: 'li',
                        parent: subMenu,
                        insert: 'append'
                    });
                    
                    const label = dom.create({
                        type: 'label',
                        parent: subLiTag,
                        insert: 'append'
                    });
                    const checkbox = dom.create({
                        type: 'input',
                        parent: label,
                        insert: 'prepend', 
                        cssClassName: 'check',
                        attr: {
                            type: 'checkbox',
                            value: subItem,
                            name: 'filterCheckbox'
                        }
                    });
                    dom.create({
                        content: subItem,
                        type: 'span',
                        parent: label,
                        insert: 'append'
                    });

                    // Event Listener hinzufügen, um nach Attributen zu filtern
                    checkbox.addEventListener('click', () => {
                        
                        let filter = settings.filters.find(val => val.filterBy === 'attribute');
                        if (!filter) {
                            settings.filters.push({ 
                                filterBy: 'attribute',
                                value: [subItem] 
                            });
                        } else {
                            if (filter.value.includes(subItem)) {
                               
                                filter.value = filter.value.filter(item => item !== subItem);
                            } else {
                      
                                filter.value.push(subItem);
                            }
                          
                           if (filter.value.length === 0) {
                                settings.filters = settings.filters.filter(val => val.filterBy !== 'attribute');
                            }
                        }
                        render.content();
                    });
                }); 
                liTag.addEventListener('mouseleave', () => {
                    subMenu.style.display = 'none';
                });
                aTag.addEventListener('mouseenter', () => {
                    subMenu.style.display = 'flex';
                });
                subMenu.addEventListener('mouseenter', () => {
                    subMenu.style.display = 'flex';
                });
                subMenu.addEventListener('mouseleave', () => {
                    subMenu.style.display = 'none';
                });
            }
        });

        const searchForm = dom.create({
            type: 'form',
            parent: wrap,
            cssClassName: 'search-form',
            insert: 'append'
        });
        dom.create({
            type:'p',
            content: `<i class="fa-solid fa-magnifying-glass"></i>`,
            parent: searchForm,
            cssClassName:'magnifier',
            insert: 'append'
        })
        const searchRecipe = dom.create({
            type: 'input',
            parent: searchForm,
            cssClassName: 'search-input',
            attr: {
                type: 'text',
                placeholder: 'Rezepte suchen...',
                name: 'search',
            },
            insert: 'append'
        });
        
        
        settings.filters.push({ 
            filterBy: 'name',
            value: ''
        })
        searchRecipe.addEventListener('input', evt =>{
            let filter = settings.filters.find(val => val.filterBy === 'name');
            filter.value = evt.target.value 
            render.content();
        });
    }, 
   
 
    content(){
        
        let filteredContent  = [...settings.data]; 
     
         
        if (settings.filters.length > 0) {
            settings.filters.forEach(filter => {
                if (filter.filterBy === 'name') {
                    
                    filteredContent = filteredContent.filter(val =>
                        val[filter.filterBy].toLowerCase().includes(filter.value.toLowerCase())
                      
                    );
                } else if (filter.filterBy === 'attribute') {
                
                    filteredContent = filteredContent.filter(val =>
                        filter.value.some(v => val[filter.filterBy].includes(v))
                    );
                }
               
                
            });
        }
         let elContainer = settings.elements.container;
         elContainer.innerHTML = "";
        filteredContent.forEach(val => {
            const collection = dom.create({
                type: 'div', 
                parent: elContainer,
                cssClassName: 'collection', 
                insert: 'append'
            });
            const pic = dom.create({
                type: 'div', 
                parent: collection,
                cssClassName: 'pic', 
                insert: 'append'
            });
            const img = dom.create({
                type: 'img', 
                parent: pic,
                cssClassName: 'thumb', 
                src: val.bild, 
                insert: 'append',
                attr: {
                    name: val.name 
                }
            });
            const info = dom.create({ 
                type: 'div', 
                parent: collection,
                cssClassName: 'info', 
                insert: 'append'
            });
            dom.create({
                content: val.name, 
                type: 'h2', 
                parent: info,
                cssClassName: '',  
                insert: 'append'
            });
            const infoFlex = dom.create({
                type: 'div', 
                parent: info,
                cssClassName: 'infoFlex', 
                insert: 'append'
            });
            dom.create({
                content: val.land, 
                type: 'p', 
                parent: infoFlex,
                cssClassName: '',
                insert: 'append'
            }); 
            dom.create({
                content: `<i class="fa-regular fa-clock"></i> ${val.zubereitungszeit}`, 
                type: 'p', 
                parent: infoFlex,
                cssClassName: '',  
                insert: 'append'
            });
            dom.create({
                content: val.beschreibung, 
                type: 'p', 
                parent: info,
                cssClassName: '', 
                insert: 'append'
            });
            const btn = dom.create({
                content: `Zum Rezept`, 
                type: 'button', 
                parent: info,
                cssClassName: 'btn',
                insert: 'append',
                attr: {
                    name: val.name 
                }
            }); 
            btn.addEventListener('click', evt =>{
                const recipeName = evt.target.getAttribute('name');
                render.showRecipeDetail(recipeName);
            });
            img.addEventListener('click', evt =>{
                const recipeName = evt.target.getAttribute('name');
                render.showRecipeDetail(recipeName);
            })
        });
    },

    showRecipeDetail(recipeName){
        let elMain = settings.elements.main;
        elMain.innerHTML = "";
        const recipe = settings.data.find(val => val.name === recipeName);
        if (recipe) {
            const TopDivScroll = dom.create({
                type: 'div', 
                parent: elMain,
                cssClassName: '', 
                insert: 'append'
            });
             TopDivScroll.scrollIntoView({ behavior: 'smooth' });
            const ContRezept = dom.create({
                type: 'div', 
                parent: elMain,
                cssClassName: 'ContRezept', 
                insert: 'append'
            });
            dom.create({
                content: recipe.name, 
                type: 'h2', 
                parent: ContRezept,
                cssClassName: 'recipeTitle',  
                insert: 'append'
            });
            const details = dom.create({
                type: 'div', 
                parent: ContRezept,
                cssClassName: '', 
                insert: 'append'
            });
            dom.create({
                content: `${recipe.land} | <i class="fa-regular fa-clock"></i> ${recipe.zubereitungszeit} | Schwierigkeit: ${recipe.schwierigkeit}`, 
                type: 'p', 
                parent: details,
                cssClassName: 'infoDetails',
                insert: 'append'
            }); 
            
            const img = dom.create({
                type: 'img', 
                parent: ContRezept,
                cssClassName: 'bigPic', 
                src: recipe.bild, 
                insert: 'append'
            });
            dom.create({
                content: recipe.beschreibung, 
                type: 'p', 
                parent: ContRezept,
                cssClassName: 'descript', 
                insert: 'append'
            });

            const contZuberaitung = dom.create({
                type: 'div',
                parent: ContRezept,
                cssClassName: 'contZuberaitung',
                insert: 'append'
            });
            dom.create({
                content: 'Zutaten',
                type: 'h3',
                parent: contZuberaitung,
                insert:'append'
            });
            const zutatenlist = dom.create({
                content: false, 
                type: 'ul', 
                parent: contZuberaitung,
                cssClassName: 'zutatenlist', 
                insert: 'append'
            });
            recipe.zutaten.forEach(zutat =>{
                dom.create({
                    content: zutat, 
                    type: 'li', 
                    parent: zutatenlist,
                    cssClassName: '',
                    insert: 'append'
                })
            });
            dom.create({
                content: 'Zubereitung',
                type: 'h3',
                parent: contZuberaitung,
                insert:'append'
            });
            const zubereitungList = dom.create({
                content: false, 
                type: 'ul', 
                parent: contZuberaitung,
                cssClassName: 'zubereitungList', 
                insert: 'append'
            });
            recipe.Zubereitung.forEach(punkt =>{
                dom.create({
                    content: punkt, 
                    type: 'li', 
                    parent: zubereitungList,
                    cssClassName: 'text', 
                    insert: 'append'
                })
            });
            const containerTipp = dom.create({
                type: 'div',
                parent: ContRezept,
                cssClassName: 'containerTipp',
                insert: 'append'
            });
            dom.create({
                content: 'Tipp:',
                type: 'h4',
                parent: containerTipp,
                insert:'append'
            });
            dom.create({
                content: recipe.tipp, 
                type: 'p', 
                parent: containerTipp,
                cssClassName: '', 
                insert: 'append'
            });
            const containerBtns = dom.create({
                type: 'div',
                parent: ContRezept,
                cssClassName: 'btns',
                insert: 'append'
            });
            const btnPrint = dom.create({
                content: 'Rezept drucken',
                type: 'button',
                parent: containerBtns,
                cssClassName: 'printBtn',
                insert: 'append',
            });
            const btnBack = dom.create({
                content: 'zurück',
                type: 'button',
                parent: containerBtns,
                cssClassName: 'printBtn',
                insert: 'append',
            });
            
            btnBack.addEventListener('click', () =>{
                let elMain = settings.elements.main;
                elMain.innerHTML = "";
                render.createContainerInMain();
                render.content();
            })
            btnPrint.addEventListener('click', () => {
                window.print();
            });
        }
    },
    createContainerInMain() {
        let elMain = settings.elements.main;
        let elContainer = settings.elements.container;
        if (!elMain.contains(elContainer)) {
            const elContainer = dom.create({
                type: 'div', 
                parent: elMain,
                id: 'container', 
                insert: 'append'
            });
            settings.elements.container = elContainer;
        }
    }
    
}
export default render;
