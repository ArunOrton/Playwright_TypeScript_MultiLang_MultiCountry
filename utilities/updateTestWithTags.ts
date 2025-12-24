const azdev = require('azure-devops-node-api')

/**
 * Updates the tags for a list of work items in Azure DevOps. The function removes specified tags and adds new tags for each work item.
 * If a specified tag already exists for a work item, it skips updating that work item.
 *
 * @param {string[]} workItemIds - An array of work item IDs that will have their tags updated.
 * @param {string} removeTagName - A JSON string representing the list of tag names to be removed from the work items.
 * @param {string[]} addTagNames - An array of tag names to be added to the work items.
 * @returns {Promise<any[]>} - A promise that resolves to an array of updated work item objects.
 */
export async function updateTagForTest(workItemIds: number[], removeTagName: string, addTagNames: string[]) {
  const returnObj: any[] = [] // Declare returnObj with an explicit type
  let removeTagNameArray = JSON.parse(removeTagName)

  if(process.env.AZURE_TOKEN) {
    let authHandler = azdev.getPersonalAccessTokenHandler(process.env.AZURE_TOKEN)

    try {
      let connection = new azdev.WebApi(process.env.OrgUrl, authHandler)
      await connection.connect()
      const newTags = addTagNames.map(tag => tag.trim())

      let witApi = await connection.getWorkItemTrackingApi()

      for(const workItemId of workItemIds) {
        try {
          // Fetch the existing work item
          const workItem = await witApi.getWorkItem(workItemId, null, null, ['System.Tags'])

          // Check if tags exist and split them into an array
          let existingTags = workItem.fields['System.Tags']
            ? workItem.fields['System.Tags'].split(';').map(tag => tag.trim())
            : []
          const printexistingTags = existingTags.join(',')
          const isTagAlreadyExist = existingTags.filter(tag => tag.toLowerCase() == addTagNames[0].toLowerCase())
          if(isTagAlreadyExist.length > 0) {
            console.log(
              `Tag ${isTagAlreadyExist} already exists for WorkItem :"${printexistingTags}". Skipping update for this work item.`
            )
            continue // Skip logic for this work item
          } else {
            // Remove the tag if it exists
            existingTags = existingTags.filter(tag =>
              !removeTagNameArray.some(removeTag => removeTag.toLowerCase() === tag.toLowerCase())
            )

            // Add new tags and remove duplicates (case-insensitive)
            existingTags = [...new Set([...existingTags, ...newTags.map(tag => tag.toLowerCase())])]

            const printUpdatedTags = existingTags.join(';')

            // Prepare payload to update work item
            const payload = [
              {
                op: 'replace',
                path: '/fields/System.Tags',
                value: existingTags.join(';'),
              },
            ]
            console.log(`The existing tags are ${printexistingTags} and updated tags ${printUpdatedTags} For Testcases : ${workItemId}`)

            // Update work item with new tags
            const updatedWorkItem = await witApi.updateWorkItem(null, payload, workItemId)
            returnObj.push(updatedWorkItem) // Push updated work item to returnObj
          }
        } catch(error) {
          console.error('Error updating tags for work item:', error)
        }
      }
    } catch(err) {
      console.error('Error creating work item:', err)
      return null
    }
    return returnObj
  }
}


// Example usage
// const workItemIds = [432945] // Replace with your work item IDs
// const removeTagName = 'automation_in_progress' // Replace with your tag
// const addTagNames = ['automation_in_progress1']
// updateTagForTest(workItemIds, removeTagName, addTagNames).catch(console.error)