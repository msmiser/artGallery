$( document ).ready(function() {
    var url=window.location.host;
    console.log(url);
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    $(".artist").on("click", function(event) {
        var thisId = $(this).data("id");        
        console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/artist/" + thisId
      }).then(function(data){
        window.location.replace('/artist/'+ thisId);
      });
    });

    $(".artist").on("click", function(event) {
        var person = $(this).data("id");        

    $.ajax({
        method: "GET",
        url: "/artist/" + person
      }).then(function(data){
        window.location.replace('/artist/'+ person);
      });
    });

    $(".artPiece").on("click", function(event) {
        var piece = $(this).data("id");        
        console.log(piece);

    $.ajax({
        method: "GET",
        url: "/art/" + piece
      }).then(function(data){
        window.location.replace('/art/'+ piece);
      });
    });

    $( "input" ).change(function() {
      var quant=parseInt($(this).val());
      var price=parseInt($("#total").data("value"));
      var newTot;
      if (isNaN(quant) === false){

          newTot=quant*price;
          console.log(newTot);
          $("#total").text("Total: "+formatter.format(newTot));
          $('#confirmation').removeAttr('disabled');
      }
      else{
        $("#alertMessage").text("Please enter valid quantity");
        $('#confirmation').attr('disabled','disabled');

      }
    });

    $("#confirmation").on("click", function(event) {
      var purchased = $(this).data("id");
      console.log(purchased);
      var quantity=parseInt($("input").val());
      var price=parseInt($("#total").data("value"));
      var total=formatter.format(price*quantity);
      var purchaseData={
        quantity: quantity,
        total: total
      }
  
        $.ajax({
          method: "POST",
          url: "/purchase/" + purchased,
          data: purchaseData
        }).then(function(data){
          var theTemplate = Handlebars.compile (data);
          console.log(theTemplate);
          $(document.body).html(theTemplate (data));
      });
    });

});