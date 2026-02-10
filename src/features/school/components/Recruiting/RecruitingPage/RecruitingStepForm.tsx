import CurrentStepInfo from '../CurrentStepInfo/CurrentStepInfo'
import RecruitingStep from '../RecruitingStepIndicator/RecruitingStep'
import { Step1, Step2, Step3, Step4, Step5 } from '../RecruitingStepPage'
import { useRecruitingContext } from './RecruitingContext'

const RecruitingStepForm = () => {
  const {
    recruitmentForm,
    recruitingFormValues,
    initialRecruitmentSchedule,
    currentStep,
    setCurrentStep,
    applicationPageNumber,
    setApplicationPageNumber,
    selectedQuestionPart,
    setSelectedQuestionPart,
    questionPartCompletionMap,
    setQuestionPartCompletionMap,
  } = useRecruitingContext()
  const { control, setValue, setError, clearErrors } = recruitmentForm
  return (
    <>
      <RecruitingStep step={currentStep} />
      <CurrentStepInfo step={currentStep} />
      <form
        css={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}
        method="POST"
      >
        {currentStep === 1 && <Step1 control={control} status={recruitingFormValues.status} />}
        {currentStep === 2 && (
          <Step2
            control={control}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            initialSchedule={initialRecruitmentSchedule}
            status={recruitingFormValues.status}
          />
        )}
        {currentStep === 3 && (
          <Step3
            control={control}
            page={applicationPageNumber}
            setPage={setApplicationPageNumber}
            part={selectedQuestionPart}
            setPart={setSelectedQuestionPart}
            partCompletion={questionPartCompletionMap}
            setPartCompletion={setQuestionPartCompletionMap}
            canEditQuestions={recruitingFormValues.status === 'DRAFT'}
          />
        )}
        {currentStep === 4 && <Step4 control={control} />}
        {currentStep === 5 && <Step5 setStep={setCurrentStep} formData={recruitingFormValues} />}
      </form>
    </>
  )
}

export default RecruitingStepForm
