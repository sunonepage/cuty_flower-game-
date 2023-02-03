

$(function(){
    $('.random_sprout').hide();
    $('.random_monster').hide();
    $('.random_flower').hide();//흙밭을 제외하고 다른 요소들은 숨김
    // let hole=9;
    let ar=new Array;
    let num=0;
    //배열과 변수들
    const countD=function(){
        let timer=setInterval(function(){
            console.log(sec);
            
            //1초마다 카운트 
            if(sec<=0){//만약 0초가 되면,
                clearInterval(timer);
                clearInterval(die_chk); 
                for(let i=0; i<zone.length; i++){//zone 반복문 함수      
                    if(zone.eq(i).children('.spray').index()==-1){//zone(i)의 class가 spray인 자식이 없을 때,
                        zone.eq(i).children('.random_sprout').children('img').attr('src','source/sprout_die.png');
                        //zone(i)의 class가 random_sprout의 이미지 속성을 바꿔서 (시든 새싹 이미지)
                    }
                    setTimeout(function(){
                        zone.eq(i).children('.random_sprout').children('img').attr('src','source/sprout_die.png').remove();
                        zone.eq(i).children('.random_sprout').append($('<img src="source/sprout.png" alt="sprout"></img>')).hide();
                    },1000);
                    //1초 후에 시든 새싹 이미지는 지우고 원래 새싹 이미지를 넣어줌
            }
            }
            sec--;
        },1000);
    }
    function randomTarget(){
        let elems=$('.game_zone>.zone').children('div:not(:first-of-type)');
        elems.hide();//게임 구성 셋팅
        // let if_zone=zone.eq(i).children();
        
        for(let i=0; i<3; i++){
            num=Math.floor(Math.random() * 9);
            if(ar.indexOf(num)===-1){
                ar.push(num);
                console.log(num);
                $('.game_zone>.zone').eq(num).children('div').eq(1).show();
                countD()
            }else{
                i--;
            }
        }//시작할 때 3개 새싹이 튀어 나오게 하는 함수
        
    }
    randomTarget();

    
    function againRandom(){
    
        $('.spray_click').remove();
        num=Math.floor(Math.random() * 9);
        
        // for(let i=0; i<zone.length; i++){
            for(let i=0; i<ar.length; i++){
                
                if(ar[i]!==(num)){
                    ar.push(num);
                    console.log(ar);
                    $('.game_zone>.zone').eq(num).children('div').eq(1).show();
                    countD();
                }else if(ar[i]===(num)){
                    ar=[];
                    ar.push(num);
                }else{
                    i--;
                }
            }
            //보이던 요소가 없어질 때 하나씩 튀어나오게 만드는 조건 만들어야..
        }
    function lucky(ln){
        let lucky_num=Math.random();
        if(0<=lucky_num && lucky_num<0.3){
            $(ln).children().eq(1).hide();
            $(ln).children().eq(2).show();
            setTimeout(function(){
                $(ln).children().eq(2).hide();
                countD();
            },1000);
            setTimeout(againRandom, 1000);
        }else{
            $(ln).children().eq(1).hide();
            $(ln).children().eq(3).show();
            if(btn2===false){
                setTimeout(function(){
                    $(ln).children().eq(3).children('img').attr('src','source/live_mon.png');
                    life--;
                    $('.life>img').eq($('.life>img').length-1).remove();
                },1000);
            }
            if(btn2===false){
                setTimeout(function(){
                    $(ln).children().eq(3).children('img').attr('src','source/live_mon.png').remove();
                    $(ln).children().eq(3).append($('<img src="source/moster.png" alt="monster"></img>')).hide();
                    countD();
                },2000)
            }
            
        }//새싹에 스프레이 뿌린 후 3 대 7 의 확률로 꽃이나 괴물이 튀어나옴
    }//setTimeout(againRandom, 1000);
    
    
    let btn1=false;//물 버튼이 상태 변수
    function waterBtn(){
        $('.water').click(function(){
            btn1=true;//물버튼을 누르면 상태변수가 true값으로 바뀜
            console.log(btn1);
        }) ;
        $('.game_zone>.zone').click(function(){
            if(btn1==true){//상태변수가 true일 때, zone을 클릭하면
                $(this).append($('<div class="spray"><img src="source/spray.png" alt="물뿌리개"></div>'));
                $(this).children('.spray').addClass('spray_click');
                //누른 zone에 스프레이를 집어넣고, addClass를 시켜서 물을 주는 모션을 취하게 함
                setTimeout(function(){
                    btn1=false;
                    $('.spray').hide();
                }, 500);//물을 주는 모션을 취한다음 상태 변수는 false가 되고 스프레이를 숨겨줌
                setTimeout(lucky, 1000, this);//셋타임아웃에 매개변수 넣는 법 (함수명,시간,매개변수1,매개변수2,...)
                //물을 주고 1초 후에 lucky 랜덤함수가 this로 튀어나오게 함
            }
        });
    }//
    waterBtn();

    let life=2;
    let btn2=false;//kill버튼의 상태 변수
    function mistake(){
        $('.kill').click(function(){//kill버튼을 누르면, kill의 상태 변수가 true로 변한다
            btn2=true;
            console.log(btn2);
        });
        $('.game_zone>.zone').click(function(){
            if(btn2==true){//kill버튼의 상태 변수가 true일 때, zone을 클릭하면
                $(this).append($('<div class="scissors"><img src="source/scissors.png" alt="가위"></div>'));
                $(this).children('.scissors').addClass('scissors_click');
                //클릭된 해당 zone에 가위를 집어넣고 addclass를 시켜서 가위로 자르는 모션을 취해줌
                setTimeout(function(){
                    btn2=false;
                    $('.scissors_click').remove();
                }, 500);//0.5초 후에 상태변수가 false로 바뀌면서 가위가 없어짐

                let sibling=$(this).children();//zone의 자식 위치를 변수에다가 저장
                if(sibling.eq(1).css('display')=='block'){//zone의 자식들 중 eq(1)=새싹이 보일 때, 
                    life--;//가위를 휘두르면 생명이 1개 날아감
                    $('.life>img').eq($('.life>img').length-1).remove();//생명 이미지 1개 삭제
                    sibling.eq(1).hide();//가위로 죽은 새싹 숨김
                } else if(sibling.eq(3).css('display')=='block'){//zone의 자식들 중 eq(3)=괴물이 보일 때,
                    let score=Number($('.score').text()); score+=10;//가위를 휘두르면 점수 +10
                    $('.score').text(score); 
                    sibling.eq(3).children('img').attr('src','source/mon_die.png');//괴물 이미지 속성을 바꿈! 
                    setTimeout(function(){
                        sibling.eq(3).children('img').attr('src','source/mon_die.png').remove();//1초 후에 바뀐 괴물 이미지 삭제
                        sibling.eq(3).append($('<img src="source/moster.png" alt="monster"></img>')).hide();
                        //몬스터가 사라진 빈 태그에 다시 원래 이미지 집어넣어 줌
                    },1000);
                }
                setTimeout(againRandom, 1000);
            }
        });
        
    }
    mistake();
    
    const zone=$('.game_zone>.zone');//zone 위치 변수 선언
    let sec=3//3초 제한으로 쓸 변수
   // let set2;

    function notWater(){//3초 이내로 물을 주지 않으면 작동되는 함수
        for(let i=0; i<zone.length; i++){
            if(zone.eq(i).children('.spray').index()!==-1){//만약 spry 태그가 있는 zone이라면,
                zone.eq(i).children('.random_sprout').children('img').attr('src','source/sprout.png');
                //해당 영역의 class가 random_sprout의 이미지 속성(시든 새싹 이미지)을 바꿔준다
            }
        }
    }
    let die_chk=setInterval(notWater,100);
    
});