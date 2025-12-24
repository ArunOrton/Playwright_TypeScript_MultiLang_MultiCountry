const fs = require('fs')
const { parseStringPromise, Builder } = require('xml2js')


/**
 *
 */
async function cleanJUnitReport() {
  console.log('✅ Started: Setup test cases from JUnit XML')
  const xmlPath = './test-results/e2e-junit-results.xml'

  if(!fs.existsSync(xmlPath)) {
    console.warn(`❗ JUnit report not found at: ${xmlPath}`)
    return
  }

  const xml = fs.readFileSync(xmlPath, 'utf-8')
  const parsed = await parseStringPromise(xml)

  if(!Array.isArray(parsed.testsuites.testsuite)) {
    console.warn('❗ No testsuite array found in XML.')
    return
  }

  parsed.testsuites.testsuite = parsed.testsuites.testsuite.filter(
    (suite) => !suite.$.name.includes('.setup.ts')
  )

  const builder = new Builder()
  const updatedXml = builder.buildObject(parsed)
  fs.writeFileSync(xmlPath, updatedXml)
  console.log('✅ Removed .setup test cases from JUnit XML')
}

cleanJUnitReport()
