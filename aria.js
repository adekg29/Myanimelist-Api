let $ = jQuery;

$('#meta_mal_api_button').click(function () {
  let id = $('#meta_mal_api_input').val();
  $('#meta_mal_api_input').val('Processing').attr("disabled", 'disabled');
  fetch('https://api.jikan.moe/v4/anime/' + id)
    .then(res => res.json())
    .then(res => {
      $('#title').val(res.title);
      $('#youmetabox_synonyms').val(res.data.title_synonyms.join(", "));
      $('#youmetabox_english').val(res.data.title_english);
      $('#youmetabox_japanese').val(res.data.title_japanese);
      $('#youmetabox_episodes').val(res.data.episodes);
      $('#youmetabox_duration').val(res.data.duration);
      $('#youmetabox_aired').val(res.data.aired.string);
      $('#youmetabox_source').val(res.data.source);
      $('#youmetabox_score').val(res.data.score);
      $('#youmetabox_rating').val(res.data.rating);
      $('#new-tag-type').val(res.data.type);
      $('#new-tag-season').val(res.data.season);
      $('#new-tag-status').val(res.data.status.replace("Currently Airing", "Ongoing"));
      $('#youmetabox_trailer').val(res.data.trailer_url.replace("?enablejsapi=1&wmode=opaque&autoplay=1", ""));
      $('#youmetabox_producers').val(res.data.producers.map(item => {
        return item.name
      }).join(", "));
      $('#youmetabox_licensors').val(res.data.licensors.map(item => {
        return item.name
      }).join(", "));
      $('#new-tag-genres').val(res.data.genres.replace(item => {
        return item.name
      }).join(","));
      $('#new-tag-studios').val(res.data.studios.map(item => {
        return item.name
      }).join(","));
      var synopsis = "";
      var output = res.data.synopsis.replace(/\n/g, "<br />");
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
