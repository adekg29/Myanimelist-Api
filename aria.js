let $ = jQuery;

$('#meta_mal_api_button').click(function () {
  let id = $('#meta_mal_api_input').val();
  $('#meta_mal_api_input').val('Processing').attr("disabled", 'disabled');
  fetch('https://api.jikan.moe/v3/anime/' + id)
    .then(res => res.json())
    .then(res => {
      $('#title').val(res.title);
      $('#ak_synonyms').val(res.title_synonyms.join(", "));
      $('#ak_english').val(res.title_english);
      $('#snap_japanese').val(res.title_japanese);
      $('#snap_eps').val(res.episodes);
      $('#snap_duration').val(res.duration);
      $('#snap_aired').val(res.aired.string);
      $('#ak_source').val(res.source);
      $('#snap_skor').val(res.score);
      $('#ak_rating').val(res.rating);
      $('#new-tag-type').val(res.type);
	  $('#new-tag-genre').val(res.genres);
      $('#new-tag-studio').val(res.studios);
	  $('#new-tag-season').val(res.premiered);
      $('#new-tag-status').val(res.status.replace("Currently Airing", "Ongoing"));
      $('#snap_trailer').val(res.trailer_url.replace("?enablejsapi=1&wmode=opaque&autoplay=1", ""));
      $('#ak_producers').val(res.producers.map(item => {
        return item.name
      }).join(", "));
      $('#ak_licensors').val(res.licensors.map(item => {
        return item.name
      }).join(", "));
      $('#new-tag-genre').val(res.genres.map(item => {
        return item.name
      }).join(","));
      $('#new-tag-studio').val(res.studios.map(item => {
        return item.name
      }).join(","));
      var synopsis = "";
      var output = res.synopsis.replace(/\n/g, "<br />");
      synopsis += "" + output + "";
      if (typeof tinyMCE != "undefined") {
        var editor_id = wpActiveEditor;
        if ($('#wp-' + editor_id + '-wrap').hasClass('tmce-active') && tinyMCE.get(editor_id)) {
          tinyMCE.get(editor_id).setContent(synopsis);
        } else {
          $("#content").val(synopsis);
        }
      }
    })
    .then(() => {
      $('#meta_mal_api_input').val('Success').removeAttr("disabled", 'disabled');
    })
    .catch(e => {
      alert('Error: Please Input Correct MAL ID!');
      $('#meta_mal_api_input').val('').removeAttr("disabled", 'disabled');
      console.log(e)
    });
})
