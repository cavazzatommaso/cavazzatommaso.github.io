
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gioco al 21</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
</head>
<body>
<?php
    error_reporting(0);
    $cards = ["ba","b2","b3","b4","b5","b6","b7","bf","b8","br","ca","c2","c3","c4","c5","c6","c7","cf","c8","cr","sa","s2","s3","s4","s5","s6","s7","sf","s8","sr","da","d2","d3","d4","d5","d6","d7","df","d8","dr"];
    echo "<form action=".$_SERVER["PHP_SELF"]." method='get'>";
    if(isset($_GET["carteusate"])){
        $carteusate = $_GET["carteusate"];
        $carte = explode("-",$carteusate);
        for($i=0;$i<count($carte);$i++){
            $cards[$carte[$i]] = 0;
        }
    }
    $alltrue = 1;
    foreach($cards as $item) {
    if($item!='true') { $alltrue = 0; }
    }
    if($alltrue) 
    {
        echo "<button type='submit' name='giocatore' value='gira' disabled id='mazzo'><img src='./assets/img/cards/retro.jpg' width='150' height='250'></button>";
    } else {
        echo "<button type='submit' name='giocatore' value='gira' id='mazzo'><img src='./assets/img/cards/retro.jpg' width='150' height='250'></button>";
    }
    //echo "<button type='submit' name='giocatore' value='gira'><img src='./assets/img/cards/retro.jpg' width='150' height='250'></button>";
    
    if($_GET){
        if($_GET["giocatore"]){
            $ok = false;
            $alltrue = 1;
            foreach($cards as $item) {
            if($item!='true') { $alltrue = 0; }
            }
            if($alltrue) { echo("Non ci sono piu carte disponibili"); }
            else { 
                do{
                    $r = rand(0,39); 
                    if($cards[$r] !== 0){
                        echo "<img src='./assets/img/cards/".$cards[$r].".jpg' width='150' height='250' id='carta' class='animated slideInUp'>";
                        echo "<input type='hidden' value='".$_GET["carteusate"].$r."-' name='carteusate'>";
                        $valoreCarta = preg_split("/[s,b,c,d]+/",$cards[$r]);
                        $punteggio = $_GET["punteggio"];
                            if($valoreCarta[1] == "a"){
                                $punteggio += 11;
                            } 
                            if($valoreCarta[1] == "r"){
                                $punteggio += 4;
                            }
                            if($valoreCarta[1] == 8){
                                $punteggio += 4;
                            }
                            if($valoreCarta[1] == "f"){
                                $punteggio += 2;
                            } else {
                                $punteggio += $valoreCarta[1];
                            }
                        echo "<input type='hidden' value='".$punteggio."' name='punteggio'>";
                        $ok = true;
                    }
                    $cards[$r] = 0;
        
                    }while(!$ok);
             }
            
        }
    }
    echo "</form>";
    ?>
</body>
</html>