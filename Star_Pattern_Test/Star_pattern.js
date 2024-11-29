


function Trinagle(num){
    for (let i=1; i<num;i++){
        let line=' ';
        for (let j=1;j<=i;j++){
            if (j<i){
            line+=j%2===0?'_':'*';

        }
        else{
            line+='*';
        
    }

    }
    console.log(line);

}

for (let i=num-1;i>1;i--){
    let line='';
    for (let j=1;j<=i;j++){
        if (j<i){
            line+=j%2===0?'_':'*';
    }
    else{
        line+='*';
        }
}
console.log(line);
}
console.log('*')
}


number =5;
Trinagle(number);



