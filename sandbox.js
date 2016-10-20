for(i=0; i< dataset.length; i++){
$('select[name^="book[' + bookIndex + '].title"').on('change',function(){console.log($(this).val())});


}
