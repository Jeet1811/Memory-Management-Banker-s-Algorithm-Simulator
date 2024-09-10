function resetall(){
    // Function which will refresh the page eventually all content will be cleared
    window.location.reload();
}
function createProcessRow(){
    // 1st function
    var process = document.getElementById("process");
    var resources = document.getElementById("resources");
    if (process.value==null || process.value==0 || resources.value==null || resources.value==0)
    {
        alert("Number of Process and Number of Resources can't be NULL or 0");
        return false;
    }
    document.getElementById("resetBtn").style.visibility="visible";
    document.getElementById("inputBtn").disabled=true;
    createProcessDetails(process.value,resources.value);
}
function createProcessDetails(process,resources){
    // 2nd function - Create Allocate Process
    document.getElementById("section-2").style.visibility="visible";
    var TableDiv = document.getElementById("section-2");
    var table = document.createElement('TABLE');
    table.border='1';
    table.setAttribute("id","allocateTable");
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (var i=0; i<=process; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       for (var j=0; j<=resources; j++){
           var td = document.createElement('TD');
           td.width='75';
           var temp = document.createElement("input");
           temp.setAttribute("type", "number");
           temp.setAttribute("placeholder", "Instances Allocated");
           temp.setAttribute("value", 0);
           temp.setAttribute("min", 0);
           temp.setAttribute("max", 5); 
           temp.setAttribute("class","form-control");  
           if(i==0&&j==0){
            td.appendChild(document.createTextNode("Resources Name / Process Name - Id "));
            }
           else if(i==0&&j>0)
           {
               td.appendChild(document.createTextNode("R"+String(j-1)));
           }
           else if(i>0&&j==0)
           {
               td.appendChild(document.createTextNode('Process : '+(i)));
           }
           else if(i>0&&j>0)
           { 
               temp.id='a'+i+'+'+j;
               td.appendChild(temp);
           }
           tr.appendChild(td);
       }
    }
    TableDiv.appendChild(table);
    createTotResources(resources);
    createMaxTable(process,resources);
    document.getElementById("generate-section").style.visibility="visible";
}
function createTotResources(resources){
    // 3rd function
    document.getElementById("section-112").style.visibility="visible";
    var TableDiv = document.getElementById("section-112");
    var table = document.createElement('TABLE');
    table.border='1';
    table.setAttribute("id","totResourceTable");
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (var i=0; i<2; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       for (var j=0; j<resources; j++){
           var td = document.createElement('TD');
           td.width='75';
           var temp = document.createElement("input");
           temp.setAttribute("type", "number");
           temp.setAttribute("value", 0);
           temp.setAttribute("min", 0);
           temp.setAttribute("class","form-control");    
            if(i==0)
           {
               td.appendChild(document.createTextNode("R"+String(j)));
           }
           else
           {
                temp.id='t'+(j+1)+'+'+(j+1);
                temp.setAttribute("placeholder", "Total instances");   
                
                td.appendChild(temp);
           }
           tr.appendChild(td);
       }
    }
    TableDiv.appendChild(table);
}
function createMaxTable(process,resources){
    // 4th function
    document.getElementById("section-3").style.visibility="visible";
    var TableDiv = document.getElementById("section-3");
    var table = document.createElement('TABLE');
    table.border='1';
    table.setAttribute("id","maxTable");
    var tableBody = document.createElement('TBODY');
    var tablethead = document.createElement('THEAD');
    table.appendChild(tableBody);
    for (var i=0; i<=process; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<=resources; j++){
           var td = document.createElement('TD');
           td.width='75';
           var temp = document.createElement("input");
           temp.setAttribute("type", "number");
           temp.setAttribute("placeholder", "Maximum Instances Required");
           temp.setAttribute("value", 0);
           temp.setAttribute("min", 0);
           temp.setAttribute("max", 5); 
           temp.id=i+'+'+j;  
           if(i==0&&j==0){
            td.appendChild(document.createTextNode("Resources Name / Process Name - Id "));
            }
           else if(i==0&&j>0)
           {
               td.appendChild(document.createTextNode("R"+String(j-1)));
           }
           else if(i>0&&j==0)
           {
            td.appendChild(document.createTextNode('Process : '+(i)));
           }
           else if(i>0&&j>0)
           {
            temp.setAttribute("class","form-control");  
            td.appendChild(temp);
           }
           tr.appendChild(td);
       }
    }
    TableDiv.appendChild(table);
}
function validation(){
    process=document.getElementById("process").value;
    resources=document.getElementById("resources").value;
    // Checking for total instances of resources   
    for(var j=0;j<resources;j++){
            var x = document.getElementById('t'+(j+1)+'+'+(j+1));
            if(x.value==null||x.value<=0){
                alert("Instances of resources must be atleast 1");
                x.focus();
                return false;
            }
    }
    // checking for instances allocated table
    for(var i=1;i<=process;i++){
        for(var j=1;j<=resources;j++){
            var x = document.getElementById('a'+i+'+'+j);
            if(x.value==null||x.value<0){
                alert("Instances Allocated to a process must be atleast 0");
                x.focus();
                return false;
            }
        }
    }
    // checking for max allocation required
    for(var i=1;i<=process;i++){
        for(var j=1;j<=resources;j++){
            var x = document.getElementById(i+'+'+j);
            if(x.value==null||x.value<0){
                alert("Max. instances required to a process must be atleast 0");
                x.focus();
                return false;
            }
            else if(x.value==null||x.value<0){
                alert("Max. instances required to a process must be atleast 0");
                x.focus();
                return false;
            }
        }
    }
    for(var i=1;i<=process;i++){
        for(var j=1;j<=resources;j++){
            var x = document.getElementById(i+'+'+j);
            var y = document.getElementById('t'+(j)+'+'+(j));
            var z = document.getElementById('a'+i+'+'+j);
            if(Number(z.value) > Number(y.value)){
                alert("Total instances of a resource allocated to a process can't be greater than total instances available of that process");
                z.focus();
                return false;
            }
            if(Number(x.value)<Number(z.value)){
                alert("Max Instance of resource required must be greater than or equal to total number of instances allocated to that process");
                z.focus();
                return false;
            }
            if(Number(x.value)>Number(y.value)){
                alert("Max. instances required of a resource must be less than or equal to total instances of that resources");
                x.focus();
                return false;
            }
        }
    }
    for(var i=1;i<=resources;i++){
        var tot_count=0;
        for(var j=1;j<=process;j++){
            tot_count+=Number(document.getElementById('a'+j+'+'+i).value);
        }
        var tot_resource=Number(document.getElementById('t'+i+'+'+i).value);
        if(tot_resource<tot_count){
            alert("Total no. of instances of resource allocated can be atmost the total instances of that resource available");
            document.getElementById('t'+i+'+'+i).focus();
            return false;
        }
    }
    return true;
}
function AvailableTable(process,resources){
    // 6th function
    var TableDiv = document.getElementById("section-4"); 
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.setAttribute("id","availableTable"); 
    table.appendChild(tableBody);
    table.border='1';  
    for (var i=0; i<=1; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<resources; j++){
           var td = document.createElement('TD');
           td.width='75';
           var temp = document.createElement("input");
           temp.setAttribute("type", "number");
           temp.setAttribute("placeholder", "Instances Allocated");
           temp.setAttribute("value", 0);
           temp.setAttribute("min", 0);
           temp.setAttribute("class","form-control");
           if(i==0)
           {
               td.appendChild(document.createTextNode("R"+String(j)));
           }
           else if(i>0)
           {
            temp.id='aval'+i+'+'+j;
            td.appendChild(temp);
           }
           tr.appendChild(td);
       }
    }
    TableDiv.appendChild(table);
}
function createAvailableTable(){
    if(validation()==false){
        return false;
    }
    document.getElementById("generateAvailable").disabled=true;
    document.getElementById("section-4").style.visibility="visible";
    document.getElementById("sect-4").style.visibility="visible";
    document.getElementById("section-4").innerHTML='<hr><h2>Resource Instances Available</h2>';
    document.getElementById("sect-4").innerHTML='<hr><h6>Steps to find Available Resources</h6>';
    try{
        document.getElementById("availableTable").parentElement.removeChild(document.getElementById("availableTable"));
    }
    catch{
        // Nothing
    }
    process=document.getElementById("process").value;
    resources=document.getElementById("resources").value;
    AvailableTable(process,resources);
    for (var i=1; i<=resources; i++){
        var tempvalue = Number(0);
        var lst='' 
        for (var j=1; j<=process; j++){
             tempvalue+=Number(document.getElementById('a'+j+'+'+i).value);
             if (j!=process)
             lst=lst+document.getElementById('a'+j+'+'+i).value+' + ';
             else
             lst=lst+document.getElementById('a'+j+'+'+i).value;
        }
        var tot = Number(document.getElementById('t'+i+'+'+(i)).value) - tempvalue;
        lst = 'Available R'+(i-1)+' = '+document.getElementById('t'+i+'+'+(i)).value + ' - ( ' + lst + ' ) ';
        document.getElementById('aval1'+'+'+(i-1)).value=tot;
        document.getElementById('aval1'+'+'+(i-1)).disabled=true;
        document.getElementById('sect-4').innerHTML=document.getElementById('sect-4').innerHTML+"<p>"+lst+' = '+tot+'</p>';
       // Here we will subtract this from total instances available and then add the content to the Instances Available Table
     }
     createNeedTable(process,resources);
     document.getElementById("section-51").style.visibility="visible";
}
function NeedTable(process,resources){
    document.getElementById("section-5").style.visibility="visible";
    var TableDiv = document.getElementById("section-5");
    var table = document.createElement('TABLE');
    table.border='1';
    table.setAttribute("id","needTable"); 
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (var i=0; i<=process; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       for (var j=0; j<=resources; j++){
           var td = document.createElement('TD');
           td.width='75';
           var temp = document.createElement("input");
           temp.setAttribute("type", "number");
           temp.setAttribute("placeholder", "Instances Allocated");
           temp.setAttribute("value", 0);
           temp.setAttribute("min", 0);
           temp.setAttribute("class","form-control");
           if(i==0&&j==0){
            td.appendChild(document.createTextNode("Resources Name / Process Name - Id "));
            }
           else if(i==0&&j>0)
           {
               td.appendChild(document.createTextNode("R"+String(j-1)));
           }
           else if(i>0&&j==0)
           {
               td.appendChild(document.createTextNode('Process : '+(i)));
           }
           else if(i>0&&j>0)
           { 
               temp.id='n'+i+'+'+j;
               td.appendChild(temp);
           }
           tr.appendChild(td);
       }
    }
    TableDiv.appendChild(table);
}
function createNeedTable(process,resources){
    document.getElementById('sect-5').style.visibility='visible';
    document.getElementById('sect-5').innerHTML='<h6>Steps to find Need matrix</h6>';
    document.getElementById('section-5').innerHTML='<hr><h2>Need Matrix</h2>';
    try{
        document.getElementById('needTable').parentElement.removeChild(document.getElementById('needTable'));
    }
    catch{
        // Nothing
    }
    // <hr>
    //     <h2>Need</h2>
    NeedTable(process,resources);
    for (var i=1; i<=process; i++){
        for (var j=1; j<=resources; j++){
             var tempvalue=Number(document.getElementById(i+'+'+j).value)-Number(document.getElementById('a'+i+'+'+j).value);
             document.getElementById('n'+i+'+'+j).value=tempvalue;
             document.getElementById('n'+i+'+'+j).disabled=true;
             lst=document.getElementById('sect-5').innerHTML;
             document.getElementById('sect-5').innerHTML=lst+'<p>Need ['+i+']['+j+']='+'Max ['+i+']['+j+'] - Allocated ['+i+']['+j+']'+' = '+document.getElementById(i+'+'+j).value+' - '+document.getElementById('a'+i+'+'+j).value+' = '+tempvalue+'</p>';
        }
     }
}
function sequence(){
    console.log("Sequence");
    document.getElementById('sequence-btn').disabled=true;
    var process = Number(document.getElementById("process").value);
    var resources = Number(document.getElementById("resources").value);
    try{
        document.getElementById('seqTable').parentElement.removeChild(document.getElementById('seqTable'));
    }
    catch{
        //Nothing 
    }
    document.getElementById('section-6').innerHTML='<hr><h2>Safe Sequence</h2>';
    document.getElementById('sect-6').innerHTML='<h6>Steps to find Safe Sequence</h6>';
    // Sequence Algorithm below
    var check = false;
    // Algo
    var done = new Array(process);
    for(var i=0;i<process;i++){
        done[i]=0;
    }
    var new_allocate = new Array(process);
    var new_need = new Array(process);
    var new_available = new Array(resources);
    var old_allocate = new Array(process);
    var old_need = new Array(process);
    var old_available = new Array(resources);
    
    for (var i=0;i<resources;i++){
        new_available[i]=Number(document.getElementById('aval1+'+i).value);
        old_available[i]=Number(document.getElementById('aval1+'+i).value);
    }
    for (var i=1;i<=process;i++){
        var temp=new Array(resources);
        for (var j=1;j<=resources;j++)
        {
            temp[j-1]=Number(document.getElementById('a'+i+'+'+j).value);
        }
        new_allocate[i-1]=temp;
        old_allocate[i-1]=temp;
    }
    for (var i=1;i<=process;i++){
        var temp=new Array(resources);
        for (var j=1;j<=resources;j++)
        {
            temp[j-1]=Number(document.getElementById('n'+i+'+'+j).value);
        }
        new_need[i-1]=temp;
        old_need[i-1]=temp;
    }
    console.log(old_available);
    console.log(old_need);
    console.log(old_allocate);
    var seq = new Array();
    console.log(seq);
    for(var i=0;i<process;i++){
        for(var j=0;j<process;j++){
            if(done[j]==1){
                continue;
            }
            var check_all=0;
            for(var k=0;k<resources;k++){
                if(new_need[j][k]>new_available[k]){
                    check_all=1;
                    break;
                }
            }
            if(check_all==0){
                console.log(seq);
                console.log(j+1);
                seq.push(j+1);
                done[j]=1;
                for(var k=0;k<resources;k++){
                    new_available[k]+=new_allocate[j][k];                    
                }
            }
        }
        var complete=1;
        for(var j=0;j<process;j++){
            if(done[j]==0){
                complete=0;
                break;
            }
        }
        if(complete==1){
            check=true;
            break;
        }

    }
    document.getElementById("section-6").style.visibility="visible";
    document.getElementById("sect-6").style.visibility="visible";
        
    if(check==false){
        // Unable to find safe sequence 
        alert("Unable to find Safe Sequence, hence system is in unsafe state therefore System might be in deadlock state");
        document.getElementById('sect-6').innerHTML='<h6>Unable to find safe sequence, hence system is in unsafe state. ∴ System may be in deadlock state</h6>';
        return false;
    }
    else{
        console.log(seq);
        for(var i=0;i<process;i++){
            done[i]=0;
        }
        for(var i=0;i<process;i++){
            for(var j=0;j<process;j++){3
                if(done[j]==1){
                    continue;
                }
                var check_all=0;
                for(var k=0;k<resources;k++){
                    if(old_need[j][k]>old_available[k]){
                        check_all=1;
                        break;
                    }
                }
                if(check_all==0){
                    // seq.push(j+1);
                    document.getElementById('sect-6').innerHTML=document.getElementById('sect-6').innerHTML+'<p>Need of all Resources of Process P'+(j+1)+'<= Available, ∴ Its need can be fullfilled'+'</p>';
                    done[j]=1;
                    for(var k=0;k<resources;k++){
                        old_available[k]+=old_allocate[j][k];                    
                    }
                }
                else{
                    document.getElementById('sect-6').innerHTML=document.getElementById('sect-6').innerHTML+'<p>Need of atleast 1 Resource of Process P'+(j+1)+'> Available, ∴ this process won\'t be executed right now, Skip it '+'</p>';
                }
            }
            var complete=1;
            for(var j=0;j<process;j++){
                if(done[j]==0){
                    complete=0;
                    break;
                }
            }
            if(complete==1){
                check=true;
                break;
            }
        }
        document.getElementById("section-6").style.visibility="visible";
        document.getElementById("sect-6").style.visibility="visible";
        var TableDiv = document.getElementById("section-6");
        var table = document.createElement('TABLE');
        table.border='1';
        table.setAttribute("id","seqTable"); 
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);
        var tr = document.createElement('TR');  
        tableBody.appendChild(tr);
        for (var j=0; j<process; j++){
            var td = document.createElement('TD');
            td.width='75';
            td.appendChild(document.createTextNode('Process : '+seq[j]));
            tr.appendChild(td);
        }
        TableDiv.appendChild(table);
    }
    // 
    // document.getElementById('section-request').style.visibility=true;
    document.getElementById('section-request').style.visibility="visible";
    document.getElementById('sequence-btn').style.visibility="visible";
}
function make_request(){
    var resources=document.getElementById("resources").value;  
    try{
        document.getElementById('requestTable').parentElement.removeChild(document.getElementById('requestTable'));
    }
    catch{
        // Nothing
    }
    document.getElementById('request-btn').disabled=true;
    document.getElementById('section-7').style.visibility='visible';
    var TableDiv = document.getElementById("section-7");
    var table = document.createElement('TABLE');
    table.border='1';
    table.setAttribute("id","requestTable");
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (var i=0; i<=1; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       for (var j=0; j<=resources; j++){
           var td = document.createElement('TD');
           td.width='75';
           var temp = document.createElement("input");
           temp.setAttribute("type", "number");
           temp.setAttribute("placeholder", "Instances Required");
           temp.setAttribute("value", 0);
           temp.setAttribute("class","form-control");  
           if(i==0&&j==0){
            td.appendChild(document.createTextNode("Resources Name / Process Name - Id "));
            }
           else if(i==0&&j>0)
           {
               td.appendChild(document.createTextNode("R"+String(j-1)));
           }
           else if(i>0&&j==0)
           {
               temp.setAttribute("placeholder","Process Id (Number only)");
               temp.id='rR'+i+'+'+j;
               td.appendChild(temp);
           }
           else if(i>0&&j>0)
           { 
               temp.id='rR'+i+'+'+j;
               td.appendChild(temp);
           }
           tr.appendChild(td);
       }
    }
    TableDiv.appendChild(table);
    document.getElementById('section-8').style.visibility='visible';
    document.getElementById("request_sequence-btn").disabled=false;
}
function restore_all(check,available,need,allocate){
    for (var i=0;i<resources;i++){
        document.getElementById('aval1+'+i).value=available[i];
    }
    if(check==true)
    {
        document.getElementById('sect-4').innerHTML=' ';
    }
    for (var i=1;i<=process;i++){
        for (var j=1;j<=resources;j++)
        {
            document.getElementById('a'+i+'+'+j).value=allocate[i-1][j-1];
        }
    }
    for (var i=1;i<=process;i++){
        for (var j=1;j<=resources;j++)
        {
            document.getElementById('n'+i+'+'+j).value=need[i-1][j-1];
        }
    }
    if(check==true)
    {
        document.getElementById('sect-5').innerHTML=' ';
    }
}
function valid_request(){
    document.getElementById("request_sequence-btn").disabled=true;
    document.getElementById("request-btn").disabled=false;
    var process = document.getElementById("process").value;
    var resources = document.getElementById("resources").value;
    var old_allocate = new Array(process);
    var old_need = new Array(process);
    var old_available = new Array(resources);
    var new_allocate = new Array(process);
    var new_need = new Array(process);
    var new_available = new Array(resources);
    for (var i=0;i<resources;i++){
        old_available[i]=Number(document.getElementById('aval1+'+i).value);
        new_available[i]=Number(document.getElementById('aval1+'+i).value);
    }
    for (var i=1;i<=process;i++){
        var temp=new Array(resources);
        var temp2=new Array(resources);
        for (var j=1;j<=resources;j++)
        {
            temp[j-1]=Number(document.getElementById('a'+i+'+'+j).value);
            temp2[j-1]=Number(document.getElementById('a'+i+'+'+j).value);
        }
        old_allocate[i-1]=temp;
        new_allocate[i-1]=temp2;
    }
    for (var i=1;i<=process;i++){
        var temp=new Array(resources);
        var temp2=new Array(resources);
        for (var j=1;j<=resources;j++)
        {
            temp[j-1]=Number(document.getElementById('n'+i+'+'+j).value);
            temp2[j-1]=Number(document.getElementById('n'+i+'+'+j).value);
        }
        old_need[i-1]=temp;
        new_need[i-1]=temp2;
    }
    var pro_id=Number(document.getElementById('rR1+0').value);   
    for (var i=1;i<=resources;i++){
        var new_request = Number(document.getElementById('rR1+'+i).value);
        if(new_request>old_available[i-1]){
            alert("No. of instances of resource R"+i+" Requested is greater than total instances of that resource available");
            document.getElementById('rR1+'+i).focus();
            document.getElementById("request-btn").disabled=false;
            return false;
        }
        if(new_request>old_need[i-1]){
            alert("No. of instances of resource R"+i+" Requested is greater than total instances of that resource needed");
            document.getElementById('rR1+'+i).focus();
            document.getElementById("request-btn").disabled=false;
            return false;
        }
        new_allocate[pro_id-1][i-1]+=new_request;
        new_need[pro_id-1][i-1]-=new_request;
        new_available[i-1]-=new_request;
    }
    restore_all(false,new_available,new_need,new_allocate);
    createAvailableTable();
    if(sequence()==false){
        restore_all(true,old_available,old_need,old_allocate);
    }
    else{
        restore_all(false,new_available,new_need,new_allocate);
    }
}