
$('button#execute').click(function() {
    const fileList = Array.from($('input#csv-file').prop('files'));
    console.log(fileList);

    if (fileList.length === 0) {
        alert('Please select a file');
        return;
    }

    fileList.forEach((file) => {})
});