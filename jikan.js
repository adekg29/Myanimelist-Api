(function(global){
    "use strict";
    global.prefix = "#";
    global.fillMal = function(meta, value){
        return global(global.prefix + meta).val(value);
    }
    global.modalMal = {
        "Id_Metabox_": "image_url",
        "Id_Metabox_": "title_english",
        "Id_Metabox_": "title_synonyms",
        "Id_Metabox_": "title_japanese",
        "Id_Metabox_": "episodes",
        "Id_Metabox_": "aired_string",
        "Id_Metabox_": "broadcast",
        "Id_Metabox_": "source",
        "Id_Metabox_": "duration",
        "Id_Metabox_": "rating",
        "Id_Metabox_": "rank",
        "Id_Metabox_": "popularity",
        "Id_Metabox_": "members",
        "Id_Metabox_": "favorites",
    }
    global.mal = function(id){
        global("#meta_mal_api_button").attr("disabled", true).html("Please wait...");
        global("#spinner").addClass("is-active");
        global.ajax({
            url: "https://api.jikan.moe/anime/" + id,
            method: "GET",
            dataType: "JSON",
            beforeSend: function(){
                global("button#content-html.wp-switch-editor.switch-html, button#meta_mal_background-html.wp-switch-editor.switch-html").click();
            }
        }).done(function(json){
            global("#meta_mal_api_button").attr("disabled", false).html("Generate");
            global("#spinner").removeClass("is-active");
            if(typeof(json.error) !== "undefined"){
                console.log("Error: " + json.error);
                alert("Error: " + json.error);
            }else{
                alert("Ciee berhasil nich :* ");
                global("textarea#content").val(json["synopsis"]);
                global("input#title").val(json["title"]);
                global("input#Id_Metabox_").val(json["title_english"]);
                global("input#Id_Metabox_").val(json["title_synonyms"]);
                global("input#Id_Metabox_").val(json["title_japanese"]);
                global("input#Id_Metabox_").val(json["episodes"]);
                global("input#Id_Metabox_").val(json["aired_string"]);
                global("input#Id_Metabox_").val(json["broadcast"]);
                global("input#Id_Metabox_").val(json["source"]);
                global("input#Id_Metabox_").val(json["duration"]);
                global("input#Id_Metabox_").val(json["rating"]);
                global("input#Id_Metabox_").val(json["rank"]);
                global("input#Id_Metabox_").val(json["popularity"]);
                global("input#Id_Metabox_").val(json["members"]);
                global("input#Id_Metabox_").val(json["favorites"]);
                global.each(global.modalMal, function(key, value){
                    global.fillMal(key, json[value]);
                });
                
            }
        });
    }
    global("#meta_mal_api_button").on("click", function(){
        var input = global("#meta_mal_api_input").val();
            global.mal(input);
    });
})(jQuery);
