import { readFileSync } from 'node:fs'
import { globSync } from 'glob'
import { load } from 'cheerio'
import 'dotenv/config'

const ORAMA_PRIVATE_API_KEY = process.env.ORAMA_PRIVATE_API_KEY
const ORAMA_PRIVATE_INDEX_ID = process.env.ORAMA_PRIVATE_INDEX_ID

const baseURL = new URL('../dist', import.meta.url).pathname
const HTMLFiles = globSync('**/*.html', { cwd: baseURL })
const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const pagesToIndex = HTMLFiles.flatMap((file) => {
  const path = file.replace(/\.html$/, '')
  const pageContent = readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8')
  const $ = load(pageContent)

  const results = []
  const title = $('h1').first().text().trim()
  let currentSection = ''
  let currentContent = ''

  $('*').each(function () {
    const isHeader = $(this).is(headers.join(', '))
    if (isHeader) {
      if (currentSection && currentContent) {
        results.push({
          title: title,
          content: currentContent.trim(),
          path: getPath(path),
          category: getCategory(getPath(path)),
          section: currentSection,
        })
      }
      if (!$(this).is('h1')) {
        currentSection = $(this).clone().children().remove('script').end().text().trim()
      }
      currentContent = ''
    } else if ($(this).is('p')) {
      currentContent += `${$(this).clone().children().remove('script').end().text().trim()} `
    }
  })

  if (currentSection && currentContent) {
    results.push({
      title: title,
      content: currentContent.trim(),
      path: getPath(path),
      category: getCategory(getPath(path)),
      section: currentSection,
    })
  }

  return results
})

function getPath(path) {
  return path.endsWith('index') ? path.replace(/index$/, '') : path
}

function getCategory(path) {
  const category = path.split('/')[0]
  return category === 'index' ? '' : category
}

async function emptyIndex() {
  await fetch(`https://api.oramasearch.com/api/v1/webhooks/${ORAMA_PRIVATE_INDEX_ID}/snapshot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${ORAMA_PRIVATE_API_KEY}`,
    },
    body: JSON.stringify([]),
  })
}

async function upsertFreshData() {
  const batches = []
  const batchesSize = 25

  for (let i = 0; i < pagesToIndex.length; i += batchesSize) {
    const batch = pagesToIndex.slice(i, i + batchesSize)
    batches.push(batch)
  }

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    console.log(`Upserting batch ${i + 1}/${batches.length} with ${batch.length} items`)

    await fetch(`https://api.oramasearch.com/api/v1/webhooks/${ORAMA_PRIVATE_INDEX_ID}/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ORAMA_PRIVATE_API_KEY}`,
      },
      body: JSON.stringify({
        upsert: batch,
      }),
    })
  }
}

async function deployIndex() {
  await fetch(`https://api.oramasearch.com/api/v1/webhooks/${ORAMA_PRIVATE_INDEX_ID}/deploy`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${ORAMA_PRIVATE_API_KEY}`,
    },
  })

  console.log('Index deployed')
}

await emptyIndex()
await upsertFreshData()
await deployIndex()
