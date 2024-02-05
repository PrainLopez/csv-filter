import { decodeStream } from 'iconv-lite'
import { parse } from 'csv-parse'
import { createReadStream } from 'fs'

$('button#execute').click(function () {
  const fileList = Array.from($('input#csv-file').prop('files'))
  console.log(fileList)

  if (fileList.length === 0) {
    alert('请选择文件！')
    return
  }

  $('button#execute').prop('disabled', true)

  const result = Map()

  fileList.forEach((file) => {
    const readStream = createReadStream(file.path)
    const gbkStream = decodeStream('gbk')
    const parseStream = parse({
      delimiter: ',',
      record_delimiter: '\n',
      from_line: 4
    })

    readStream
      .pipe(gbkStream)
      .pipe(parseStream)
      .on('readable', () => {
        const filtered = []
        do {
            const record = parseStream.read()
            if (record) {
              filtered.push(record)
            }
        }
      })
  })
})
