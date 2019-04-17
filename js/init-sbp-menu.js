// ##Unclear where the current official sb3_commands.json is ... need to check on this
// Setting up the OpenSBP Menuing system=================================================
function initMenu() {
  $.getJSON('assets/sb3_commands.json', 
      function(data,) {
//      getExcludedAxes(function(excluded_axes_str){
          for (key in data) {
            switch (key.substring(0, 1)) {
            case "F":
              $("#menu_files").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</button>');
              break;
            case "M":
//              if (excluded_axes_str.indexOf(key.substring(1,2)) == -1) {
                $("#menu_moves").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</button>');
                //              }
              break;
            case "J":
//              if (excluded_axes_str.indexOf(key.substring(1,2)) == -1) {
                $("#menu_jogs").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</button>');
//              }
              break;
            case "C":
              $("#menu_cuts").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></button>');
              break;
            case "Z":
//              if (excluded_axes_str.indexOf(key.substring(1,2)) == -1) {
                $("#menu_zero").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></button>');
//              }
              break;
            case "S":
              $("#menu_settings").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></button>');
              break;
            case "V":
              $("#menu_values").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></button>');
              break;
            case "H":
              $("#menu_help").append('<button class="dropdown-item" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></button>');
              break;
          }

        }
        // $(document).foundation('dropdown', 'reflow');

        // // ** Set Up Response to Menu Click/Selection (paste in 2 Letter Command ***
        // // ... had to do this within the load and after the menu created, otherwise no binding to individual elements
        // // $(".menuDD").bind( 'click', function() {
        // //  var thisCmd = this.id;
        // //  $("#cmd-input").val(thisCmd + ", ");
        // //  $("#cmd-input").focus();
        // //  //console.log('got change ... ' + thisCmd);
        // // });

        // $(".menuDD").bind('click', function(event) {
        //   var commandText = this.id;
        //   $(document).foundation('dropdown', 'reflow');
        //   processCommandInput(commandText);
        // });
        
//      });
    })  
   }