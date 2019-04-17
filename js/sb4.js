/**
 * Main js file for SB4
 * TH modified from SB4 app; starting 1/13/19
 */


  // function sendCmd(command) {
  //   var thisCmd = command || $('#cmd-input').val();
  //   $("#txt_area").text("Running > " + thisCmd);
  //   // Some Commands Need 'SV' to make permanent; thus multiline version
  //   	var cmd_eval = thisCmd.substring(0,2);

  //         console.log(thisCmd);

  //   		switch (cmd_eval) {
  //   			case "VS":
  // 		        var mult_cmds=[
  //         		thisCmd,
  //           		'SV'						// Make Permanent
  //           		].join("\n");
  //         		fabmo.runSBP(mult_cmds);	// SEND MULTI >>>  
  //   				break;
  //   			case "MS":
  // 		        var mult_cmds=[
  //         		thisCmd,
  //           		'SV'						// Make Permanent
  //           		].join("\n");
  //         		fabmo.runSBP(mult_cmds);	// SEND MULTI >>>  
  //   				break;
  //   			default:
  // 			    fabmo.runSBP(thisCmd);    	// SEND SIMPLE >>>
  //   				break;
  //   		}
  //   $('#cmd-input').val('');    				// remove after sent or called
  // }


function getUsrResource(remote, local) {
  // temporarily only getting local because not detecting error on raspi tablets 
      fabmo.navigate(local,{target : '_blank'});

  // fabmo.isOnline(function(err, online) {
  //   if(err) {
  //     console.log("isOnline Error");
  //     return;         
  //   }
  //   if(online) {
  //     fabmo.navigate(remote,{target : '_blank'});    }
  //     //fabmo.navigate(remote,{target : '_self'});    }
  //   else {
  //     fabmo.navigate(local,{target : '_blank'});
  //   }
  // });
};

/**
function processCommandInput(command) {
  var command = command.trim().toUpperCase();
  if (command.length == 1) {
    switch (command) {
      case "K":
      	command = "SK";
      	command.length = 2;
      	break;
      case "F":
        $("#cmd-input").val(command);
        $("#menu_files").click();
        break;
      case "M":
        $("#cmd-input").val(command);
        $("#menu_moves").click();
        break;
      case "J":
        $("#cmd-input").val(command);
        $("#menu_jogs").click();
        break;
      case "C":
        $("#cmd-input").val(command);
        $("#menu_cuts").click();
        break;
      case "Z":
        $("#cmd-input").val(command);
        $("#menu_zero").click();
        break;
      case "S":
        $("#cmd-input").val(command);
        $("#menu_settings").click();
        break;
      case "V":
        $("#cmd-input").val(command);
        $("#menu_values").click();
        break;
      case "H":
        $("#cmd-input").val(command);
        $("#menu_help").click();
        break;
      default:
        command = "";
        event.preventDefault(); // ESC as a general clear and update tool
        curLine = ""; // Remove after sent or called
        $(".top-bar").click(); // ... and click to clear any dropdowns
        $("#txt_area").text("");
        $("#cmd-input").val(command);
        $("#cmd-input").focus();
        break;
    }
  } else if (command.length == 2) {

    switch (command) {
      case "JH":
      case "MH":
      case "MO":
      case "M0":
      case "SA":
      case "SR":
      case "SF":
      case "ST":
      case "ZX":
      case "ZY":
      case "ZZ":
      case "ZA":
      case "ZB":
      case "ZC":
      case "Z2":
      case "Z3":
      case "Z4":
      case "Z5":
      case "Z6":
      case "C2":
      case "C3":
        sendCmd(command);
        break;
      case "CN":
      	command = "C#";
      case "FP":
        $("#cmd-input").val(command);
        $('#file').trigger('click');
        break;
      case "SI":
      case "FN":
        fabmo.launchApp('editor', {
          'new': true,
          'content': "' Create an OpenSBP job here ...",
          'language': 'sbp'
        });
        break;

      case "HA":
        fabmo.notify('info', 'About: Sb4 Version 4.0.14');
        break;
      case "HC":
        console.log("triggered");
        getUsrResource('http://www.shopbottools.com/ShopBotDocs/files/SBG00253140912CommandRefV3.pdf', 'assets/docs/ComRef.pdf')       
        break;        
      case "HF":
        getUsrResource('https://handibot.com/forum/list.php?2', 'assets/docs/No_Internet.pdf');
        break;        
      case "HW":
        getUsrResource('https://handibot.com', 'assets/docs/No_Internet.pdf');
        break;        
      case "HQ":
        getUsrResource('http://docs.handibot.com/doc-output/Handibot2_Unboxing.pdf', 'assets/docs/Handibot 2 MANUAL Unboxing Source_v004.pdf');
        break;        
      case "HS":
        getUsrResource('http://docs.handibot.com/doc-output/Handibot2_Safety.pdf', 'assets/docs/Handibot 2 MANUAL Safe Use Source_v002.pdf');
        break;        
  
      case "SK":
      	//need "K" call
      	break;
      default:
        var newCommandString = command + ", ";
//        $("#cmd-input").val(newCommandString);
//        $("#cmd-input").focus();
        break;
    }
    return true;

  }
  return false
}
*/

// function ready(fn) {
//   if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
//     fn(
//       fabmo.manualEnter({hideKeypad:true, mode:'raw'}),
//       fabmo.requestStatus(),
//       fabmo.getConfig(),
//       window.addEventListener('focusout', (event) => {
//         console.log("lost focus!"),                     // working? Hard code a termination ... needed?
//         fabmo.manualExit()
//       }),
//       window.addEventListener('focusin', (event) => {
//         console.log("got focus!"),
//         fabmo.manualEnter({hideKeypad:true, mode:'raw'}) // working? Hard code a return ... needed?
//       })
//     )
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }

/** 

  // *** Get MENUs Items from JSON file @initial load ***
      // originally derived from 'https://raw.githubusercontent.com/FabMo/FabMo-Engine/master/runtime/opensbp/sb3_commands.json'
      // ... now using local copy with lots of mods and updates 
  $.getJSON(
    'assets/sb3_commands.json',
    function(data) {
      getExcludedAxes(function(excluded_axes_str){
console.log("here");
console.log(data);
        for (key in data) {
          switch (key.substring(0, 1)) {
            case "F":
              $("#menu_files").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              break;
            case "M":
              if (excluded_axes_str.indexOf(key.substring(1,2)) == -1) {
                $("#menu_moves").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              }
              break;
            case "J":
              if (excluded_axes_str.indexOf(key.substring(1,2)) == -1) {
                $("#menu_jogs").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              }
              break;
            case "C":
              $("#menu_cuts").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              break;
            case "Z":
              if (excluded_axes_str.indexOf(key.substring(1,2)) == -1) {
                $("#menu_zero").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              }
              break;
            case "S":
              $("#menu_settings").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              break;
            case "V":
              $("#menu_values").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              break;
            case "H":
              $("#menu_help").append('<li class="menuDD" id="' + key + '"><a >' + key + ' - ' + data[key]["name"] || "Unnamed" + '</a></li>');
              break;
          }
console.log("here");
console.log(data);

        };

        $(document).foundation('dropdown', 'reflow');

        // ** Set Up Response to Menu Click/Selection (paste in 2 Letter Command ***
        // ... had to do this within the load and after the menu created, otherwise no binding to individual elements
        // $(".menuDD").bind( 'click', function() {
        //  var thisCmd = this.id;
        //  $("#cmd-input").val(thisCmd + ", ");
        //  $("#cmd-input").focus();
        //  //console.log('got change ... ' + thisCmd);
        // });

        $(".menuDD").bind('click', function(event) {
          var commandText = this.id;
          $(document).foundation('dropdown', 'reflow');
          processCommandInput(commandText);
        });
        
      });

  });

})  

*/


    //   // ** Initialize Default Appearance                                        ####Change to remember state
    //     fabmo.showDRO();

    //   // Update the generic UI textboxes with config data from the engine
    //   updateUIFromEngineConfig();

    //   // Update the speed UI textboxes with config data from the engine (speeds are formatted)
    //   updateSpeedsFromEngineConfig();

    //   // Handle and Bind generic UI textboxes that directly change opensbp configs
    //   $('.opensbp_input').change(function() {
    //     setConfig(this.id, this.value);
    //   });

    //   // Handle and Bind updates from formatted SPEED textboxes
    //   $('.opensbp_input_formattedspeeds').change(function() {
    //     switch (this.id) {
    //       case 'formatted_movexy_speed':
    //         var mult_cmds=[
    //           'VS,' + this.value,
    //           'SV'
    //           ].join("\n");
    //           //console.log("Commands are: \n" + mult_cmds);
    //         fabmo.runSBP(mult_cmds);
    //         break;
    //       case 'formatted_movez_speed':
    //         var mult_cmds=[
    //           'VS,,' + this.value,
    //           'SV'
    //           ].join("\n");
    //         fabmo.runSBP(mult_cmds);
    //         break;
    //       case 'formatted_jogxy_speed':
    //         var mult_cmds=[
    //           'VS,,,,,,' + this.value,
    //           'SV'
    //           ].join("\n");
    //         fabmo.runSBP(mult_cmds);
    //         break;
    //       case 'formatted_jogz_speed':
    //         var mult_cmds=[
    //           'VS,,,,,,,' + this.value,
    //           'SV'
    //           ].join("\n");
    //         fabmo.runSBP(mult_cmds);
    //         break;
    //     }
    //     console.log("changed speeds ...");
    //     updateSpeedsFromEngineConfig();
    //     $("#cmd-input").focus();
    //   });

    //   // *** Respond to Command Entry
    //   var xTriggered = 0;

    //   $("#cmd-input").keyup(function(event) {

    //     // For Debug
    //     var msg = "Handler for .keyup() called " + xTriggered + " time(s). (Key = " + event.which + ")";
    //     var commandInputText = $("#cmd-input").val();
    //     xTriggered++;
    //     console.log(msg, "html");
    //     console.log(event);

    //     switch (event.which) {
    //       case 13:
    //         sendCmd(); // On ENTER ... SEND the command
    //         break;
    //       case 27:
    //         event.preventDefault(); // ESC as a general clear and update tool
    //         curLine = ""; // Remove after sent or called
    //         $(".top-bar").click(); // ... and click to clear any dropdowns
    //         $("#txt_area").text("");
    //         $("#cmd-input").focus();
    //         updateUIFromEngineConfig();
    //         updateSpeedsFromEngineConfig();
    //         break;
    //       case 8:
    //       case 46:
    //         break;
    //       default:
    //         var ok = processCommandInput(commandInputText);
    //         if (ok) {
    //           $(".top-bar").click();
    //           $("#cmd-input").focus();
    //         }
    //         break;
    //     }

    //   }); // $("#cmd-input").keyup()

    //   $("#cmd-input").keydown(function(event) {
    //     switch (event.which) {
    //       case 13:
    //         // document.getElementById("cmd-input").value = ""; // remove after sent or called
    //         event.preventDefault();
    //         break;
    //       default:
    //         break;
    //     }
    //   });

    //   // File element for FP command; Clears Cue then Runs and puts file in JobManager history
    //   $('#file').change(function(evt) {
    //     fabmo.clearJobQueue(function(err,data){
    //     if (err){
    //       cosole.log(err);
    //     } else {

    //         var filename = $('#file').val().split('\\').pop();
    //         fabmo.submitJob({
    //           file: file,
    //           name: filename,
    //           description: '... called from Sb4'
    //         }, {stayHere: true},
    //             function() { 
    //               fabmo.runNext();
    //         });
    //         console.log('file= ' + file);
    //         console.log('filename= ' + filename);
    //         $('#file').val('');
    //     }
    //   });
    //   })

    //   // $('#file').change(function(evt) {
    //   //     fabmo.clearJobQueue(function(err,data){
    //   //     if (err){
    //   //       cosole.log(err);
    //   //     } else {
    //   //       var file = $('#fileform');
    //   //       var filename = $('#file').val().split('\\').pop();
    //   //       fabmo.submitJob({
    //   //         file: content,
    //   //         filename: file,
    //   //         name: file,
    //   //         description: "Job request for: " + file,
    //   //         stayHere: true
    //   //         }, function(err, message) {
    //   //         if (err){
    //   //           console.log(err);
    //   //          } else {
    //   //             fabmo.runNext(function(err, data) {
    //   //                if (err) {
    //   //                  console.log(err);
    //   //                } else {
    //   //                    console.log('running');
    //   //                }
    //   //              });
    //   //            }
    //   //          });
    //   //        }
    //   //     });
    //   // });


    //   // Clear Command Line after a status report is recieved            ##### Need a clear after esc too
    //   fabmo.on('status', function(status) {
    //     $('#cmd-input').val("");
    //     console.log('got status report ...');
    //     if (!status.job) {
    //       $("#txt_area").text("");
    //       updateSpeedsFromEngineConfig();

    //       $(".top-bar").click(); // ... and click to clear any dropdowns
     
    //     }
    //   });


    //   // Process Macro Box Keys
    //   $("#cut_part_call").click(function(event) {
    //     console.log('got CutPart');
    //     $('#file').trigger('click');
    //   });
    //   $("#first_macro_button").click(function(event) {
    //     console.log('got firstMacro');
    //     sendCmd("C3");
    //   });
    //   $("#second_macro_button").click(function(event) {
    //     console.log('got secondMacro');
    //     sendCmd("C3");
    //   });



    //   // Just for testing stuff ... 
    //   $("#other").click(function() {
    //     console.log('got change');
    //     sendCmd("Command from Button Click");
    //     event.preventDefault();
    //   });

      


    //   //var speed_XY = parseFloat($('#opensbp-movexy_speed').val());
    //   //console.log("Speed is: " + speed_XY.toFixed(2));
    //   //console.log("Twice the speed is: " + (2*speed_XY).toFixed(2));
    // });
