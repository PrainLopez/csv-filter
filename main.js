let lineCount = 0

const condition = (data) =>
  data
    .slice(6, 9)
    .every((item) => Number.parseInt(item) <= 0)

$('button#execute').click(function () {
  const fileList = Array.from(
    $('input#csv-file').prop('files')
  )

  if (fileList.length === 0) {
    alert('请选择文件！')
    return
  }

  $('button#execute').prop('disabled', true)

  const stepFn = (results, parser) => {
    if (condition(results.data)) {
      $('<p></p>')
        .text(
          `line ${lineCount}: ${results.data.slice(6, 9)}`
        )
        .appendTo('.editing')
    }

    lineCount += 1
  }

  const errorFn = (error) => {
    $('<p></p>')
      .text(`line ${lineCount}: ${error}`)
      .addClass('error')
      .appendTo('.editing')

    lineCount += 1
  }

  const completeFn = () => {
    $('button#execute').prop('disabled', false)
    $('.editing').removeClass('editing')
    lineCount = 0
  }

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]

    var detail = $('<details></details>').addClass(
      'editing'
    )
    detail.append($('<summary></summary>').text(file.name))
    $('.list').append(detail)

    lineCount = 4
    Papa.parse(file, {
      delimiter: ',',
      dynamicTyping: true,
      encoding: 'GBK',
      step: stepFn,
      complete: completeFn,
      error: errorFn,
      beforeFirstChunk: undefined,
      transform: undefined,
      skipFirstNLines: lineCount - 1
    })
  }
})
