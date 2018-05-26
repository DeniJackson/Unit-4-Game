var yourCharacter;
var gaston = {name:'gaston',
             hp: 260,
             attack: 15,
             counterAttack: 5
                };
var ursula = {name:'ursula',
             hp: 140,
             attack: 20,
             counterAttack: 10
            }
var scar = {name:'scar',
            hp: 75,
            attack: 40,
            counterAttack: 20
            }
var jafar = {name:'jafar',
            hp: 110,
            attack: 25,
            counterAttack: 15
            }

var attacker;
var defender;
var leftoverClasses = [gaston,ursula,scar,jafar]; //Used to remove characters from enemy area
var pickedHeroImage;
var enemyImages;
var wins = 0;
var lose = 0;





//Choose a hero and move the images and classes needed to the correct area. Removes xharacter from lists
$('.heroChoices').on('click', function(){
    pickedHeroImage = $(this).css('background-image')
    $(this).addClass('hide');
    $('.heroChoices').addClass('hide');
    $('.yourHero').css('background-image', pickedHeroImage);
    $('.yourHero').css('background-size', 'cover');
    $('.yourHero').removeClass('hide');
    if($(this).hasClass('jafar')){
        leftoverClasses = $.grep(leftoverClasses, function(value) {
            return value != jafar;
            
          })
          attacker = jafar;
    } else if ($(this).hasClass('ursula')){
        leftoverClasses = $.grep(leftoverClasses, function(value) {
            return value != ursula;
            
          });
          attacker = ursula;
        } else if ($(this).hasClass('scar')){
            leftoverClasses = $.grep(leftoverClasses, function(value) {
                return value != scar;
                 
              });
              attacker = scar;
            } else{
                leftoverClasses = $.grep(leftoverClasses, function(value) {
                    return value != gaston;
                    
                  });
                  attacker = gaston;
                }
    //makes corrext enemies visible
    $('.enemy').removeClass('hide')
    $('.enemy:first').addClass(leftoverClasses[0].name);  
    $('.enemy:nth-of-type(2)').addClass(leftoverClasses[1].name);  
    $('.enemy:last').addClass(leftoverClasses[2].name);   
    //Choose the defender and removes them from enemy list
    $('.enemyChoices').on('click', function(){
        pickedEnemyImage = $(this).css('background-image')
        $(this).removeClass('enemyChoices');
        
        $(this).addClass('hide');
        $('.enemy').addClass('hide');
        $('.yourEnemy').css('background-image', pickedEnemyImage);
        $('.yourEnemy').css('background-size', 'cover');
        $('.yourEnemy').removeClass('hide');
        if($(this).hasClass('jafar')){
            leftoverClasses = $.grep(leftoverClasses, function(value) {
                return value != jafar;
                
              });
              defender = jafar;
            } else if ($(this).hasClass('scar')){
                leftoverClasses = $.grep(leftoverClasses, function(value) {
                    return value != scar;
                    
                  });
                  defender = scar;
                } else if ($(this).hasClass('ursula')){
                    leftoverClasses = $.grep(leftoverClasses, function(value) {
                        return value != ursula;
                        
                      });
                      defender = ursula;
                    } else {
                        leftoverClasses = $.grep(leftoverClasses, function(value) {
                        return value != gaston;
                        
                      });
                      defender = gaston;
                    }

                    //shows initial stats
                    $('.hp span').text(attacker.hp);
                    $('.ehp span').text(defender.hp);
                    $('.attack span').text(attacker.attack);
                    $('.cattack span').text(defender.counterAttack);
                      
                        //begin battle
                      $('.attack').on('click',function(){
                        
                        
                        if (attacker.hp > 0 && defender.hp > 0){
                            
                            defender.hp = defender.hp - attacker.attack;
                            attacker.hp = attacker.hp - defender.counterAttack;
                            $('.attack span').text(attacker.attack);
                            $('.hp span').text(attacker.hp);
                            $('.ehp span').text(defender.hp);
                            //Shows events at bottom of screen
                            $('.description').html('<p>' + attacker.name + " did " + attacker.attack + " damage! "+
                                                    defender.name + ' did ' + defender.counterAttack +" damage!</p>" +
                                                  "<p>" + attacker.name + ' now has ' + attacker.hp +" Health Points!" +
                                                    defender.name + ' now has ' + defender.hp + " Health Points! </p>") 

                        
                            } else if (attacker.hp <= 0){
                            $('.description').append('</h1>Sorry. You lose.</h1>');
                             lose++;
                             $('.lose').html('<h1>Lose: ' + lose +'</h1>')
                                } else if (defender.hp <= 0){
                                    $('.description').append('</h1>Winner!</h1>');
                                    attacker.attack = attacker.attack*2;
                                    
                                    if (leftoverClasses.length == 0){
                                        wins++;
                                        $('.wins').html('<h1>Win: ' + wins +'</h1>')
                                        resetgame();
                                        
                                    }else {
                                    resetround();
                                    }
                        }   
                    })

                      
    })
  
    
});


//Various functions for resets.
$('.reset').on('click', function(){
    resetgame();
});

function resetround(){
    $('.enemyChoices').removeClass('hide');
    $('.yourEnemy').addClass('hide');
    $('.attack').off();
    $('heroChoices').off();
    $('enemyChoices').off();
}
function resetgame(){
    
    $('.heroChoices').removeClass('hide');
    $('.yourHero').addClass('hide');
   $('.enemy').removeClass('jafar scar ursula gaston')
    $('.enemy').addClass('hide enemyChoices');
    $('.yourEnemy').addClass('hide');
    $('.description').html('');
    gaston = {name:'gaston',
             hp: 260,
             attack: 10,
             counterAttack: 5
                };
    ursula = {name:'ursula',
             hp: 140,
             attack: 20,
             counterAttack: 10
            }
    scar = {name:'scar',
            hp: 75,
            attack: 40,
            counterAttack: 20
            }
    jafar = {name:'jafar',
            hp: 110,
            attack: 25,
            counterAttack: 15
            }
    leftoverClasses = [gaston,ursula,scar,jafar];
    $('.attack').off();
    $('.enemyChoices').off();
}