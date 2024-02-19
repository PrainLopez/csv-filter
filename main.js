$('button#execute').click(async () => {
  const fileRegex = /[<>:"\/\\|?* .]/g

  $('div.list').empty()

  const fileList = Array.from(
    $('input#csv-file').prop('files')
  )

  if (fileList.length === 0) {
    alert('请选择文件！')
    return
  }

  const columnInput = $(
    'input[name="column"]:checked'
  ).val()

  if (columnInput === undefined) {
    alert('请选择列！')
    return
  }

  const columnTrim = (data) => {
    switch (columnInput) {
      case '789':
        return data.slice(6, 9)
      case '6':
        return data.slice(5, 6)
    }
  }

  const parser = (file) => {
    const condition = (data) =>
      columnTrim(data).every(
        (item) => Number.parseInt(item) >= 0
      )

    const stepFn = (results, parser) => {
      // skip the first 3 lines
      if (lineCount > 3 && !condition(results.data)) {
        $('<p></p>')
          .text(`line ${lineCount}: ${results.data}`)
          .appendTo(
            `details.${file.name.replace(fileRegex, '-')}`
          )
      }

      lineCount += 1
    }

    const errorFn = (error) => {
      $('<p></p>')
        .text(`line ${lineCount}: ${error}`)
        .addClass('error')
        .appendTo(
          `details.${file.name.replace(fileRegex, '-')}`
        )

      lineCount += 1
    }

    const completeFn = () => {
      $('button#execute').prop('disabled', false)
      lineCount = 1
    }

    let lineCount = 1
    Papa.parse(file, {
      delimiter: ',',
      dynamicTyping: true,
      encoding: 'GBK',
      step: stepFn,
      complete: completeFn,
      error: errorFn,
      beforeFirstChunk: undefined,
      transform: undefined
    })
  }

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]

    $('button#execute').prop('disabled', true)

    var detail = $('<details></details>').addClass(
      `${file.name.replace(fileRegex, '-')}`
    )
    detail.append(
      $('<summary></summary>')
        .text(file.name)
        .addClass(file.name.replace(fileRegex, '-'))
    )
    detail.appendTo('div.list')

    parser(file)
  }
})
