$(function(){
    const zone=$('.game_zone>.zone');
    let zonearr=new Array();
    let waterBtn=false;
    let killBtn=false;
    let life=2;
    let score=0;
    
    function zone_sprout(first){
        zone.eq(first).children('div:not(:first-of-type)').hide();
        zone.eq(first).children('div').eq(1).show();
        setTimeout(function(){
            if(!zone.eq(first).hasClass('clicked')){
                zone.eq(first).children('div').eq(1).find('img').attr('src','source/sprout_die.png');
                zonearr.splice(zonearr.indexOf(first),1);
            }
        },3000);
        setTimeout(function(){
            zone.eq(first).children('div').eq(1).find('img').attr('src','source/sprout.png');
            zone.eq(first).children('div').eq(1).hide();
            waterBtn=false;
            killBtn=false;
        },4000);
    }
    function randomZone(){
        let random=Math.floor(Math.random()*9);
        if(zonearr.indexOf(random)===-1){
            zonearr.push(random);
            zone_sprout(random);
        }else{
            randomZone();
        }
    }
    for(let i=0; i<3; i++){
        randomZone();
    }
    $('.water').on('click',function(){
        waterBtn=true;
    });
    $('.kill').on('click',function(){
        killBtn=true;
    });
    function replay_random(re_random){
        let replay=Math.random();
        if(replay<0.3){
            $(re_random).children().eq(1).hide();
            $(re_random).children().eq(2).show();
            setTimeout(function(){
                $(re_random).children().eq(2).hide();
                $(re_random).removeClass('clicked');
                setTimeout(randomZone,1500);
            },1000);
        }else{
            $(re_random).children().eq(1).hide();
            $(re_random).children().eq(3).show();
            if(!killBtn){
                setTimeout(function(){
                    $(re_random).children().eq(3).find('img').attr('src','source/live_mon.png')
                },1000)
                setTimeout(function(){
                    $(re_random).children().eq(3).find('img').attr('src','source/moster.png')
                    $(re_random).children().eq(3).hide();
                    randomZone();
                    game_over_bg();
                },1500)
                setTimeout(function(){
                    life--;
                    $('.life>img').eq($('.life>img').length-1).remove();
                },2000);
                setTimeout(ending,2500);
            }
        }
    }
    function game_over_bg(){
        if(life===0){
            $('#over_bg').css('display','block');
        }
    }
    function ending(){
        if(life==0){
            $('#play_top').css('display','none');
            $('#play_middle').css('display','none');
            $('#play_bottom').css('display','none');
            $('#over_bg').css('display','none');
            $('#end').css('display','block');
            $('.end').find('.score').text(score*10);
        }
    }
    $('.again').click(function(){
        score=0;
        life=2;
            $('.life').append($('<img src="source/heart.png" alt="life">'))
            $('.life').append($('<img src="source/heart.png" alt="life">'))
            $('#end').hide();
            $('#play_top').show();
            $('#play_middle').show();
            $('#play_bottom').show();
            $('#play_top').find('.score').text(score);
            randomZone();
    });
    for(let j=0; j<zone.length; j++){
        zone.eq(j).on('click',function(){
            const thiszone=$(this);
            if(thiszone.children('div').eq(1).is(':visible') && waterBtn){
                thiszone.addClass('clicked');
                thiszone.append($('<div class="spray"><img src="source/spray.png" alt="물뿌리개"></div>'));
                thiszone.children('.spray').show().addClass('spray_click');
                setTimeout(function(){ thiszone.children('.spray').remove(); }, 500);
                setTimeout(function(){replay_random(thiszone);},1000);
            }else if(thiszone.children('div').eq(3).is(':visible') && killBtn){
                thiszone.addClass('clicked2');
                thiszone.append($('<div class="scissors"><img src="source/scissors.png" alt="가위"></div>'));
                thiszone.children('.scissors').show().addClass('scissors_click');
                setTimeout(function(){ thiszone.children('.scissors').remove(); }, 500);
                
                if(thiszone.hasClass('clicked') && killBtn){
                    thiszone.children('div').eq(3).find('img').attr('src','source/mon_die.png');
                    score++;
                    $('.score').text(score*10);
                    setTimeout(function(){
                        thiszone.children('div').eq(3).find('img').attr('src','source/moster.png');
                        thiszone.removeClass('clicked2')
                        thiszone.removeClass('clicked')
                        thiszone.children('div').eq(3).hide();
                    },1000)
                    setTimeout(randomZone,1500);
                }    
            }
        })
    }
});