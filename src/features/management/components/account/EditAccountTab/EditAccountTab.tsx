import { useState } from 'react'

import DefaultEditView from '../DefaultEditView/DefaultEditView'
import EditModeView from '../EditModeView/EditModeView'

const EditAccountTab = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  return <>{isEditMode ? <EditModeView /> : <DefaultEditView setIsEditMode={setIsEditMode} />}</>
}

export default EditAccountTab
