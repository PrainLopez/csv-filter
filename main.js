
$('button#execute').click(function () {
  const fileList = Array.from($('input#csv-file').prop('files'))
  console.log(fileList)

  if (fileList.length === 0) {
    alert('请选择文件！')
    return
  }

  $('button#execute').prop('disabled', true)

  const result = Map()

  fileList.forEach((file) => {})
})