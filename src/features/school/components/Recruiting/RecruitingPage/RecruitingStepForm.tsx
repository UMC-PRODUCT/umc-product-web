import CurrentStepInfo from '../CurrentStepInfo/CurrentStepInfo'
import RecruitingStep from '../RecruitingStepIndicator/RecruitingStep'
import { Step1, Step2, Step3, Step4, Step5 } from '../RecruitingStepPage'
import { useRecruitingContext } from './RecruitingContext'

const RecruitingStepForm = () => {
  const {
    form,
    values,
    initialSchedule,
    step,
    setStep,
    step3PageNumber,
    setStep3PageNumber,
    step3SelectedPart,
    setStep3SelectedPart,
    partCompletionMap,
    setPartCompletionByPart,
  } = useRecruitingContext()
  const { control, setValue, setError, clearErrors } = form
  const draftLockEnabled = import.meta.env.VITE_FORCE_LOCK_IN_DRAFT === 'true'
  return (
    <>
      <RecruitingStep step={step} />
      <CurrentStepInfo step={step} />
      <form css={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }} action="">
        {step === 1 && <Step1 control={control} status={values.status} />}
        {step === 2 && (
          <Step2
            control={control}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            initialSchedule={initialSchedule}
            status={values.status}
          />
        )}
        {step === 3 && (
          <Step3
            control={control}
            page={step3PageNumber}
            setPage={setStep3PageNumber}
            part={step3SelectedPart}
            setPart={setStep3SelectedPart}
            partCompletion={partCompletionMap}
            setPartCompletion={setPartCompletionByPart}
            canEditQuestions={values.status === 'DRAFT' && !draftLockEnabled}
          />
        )}
        {step === 4 && <Step4 control={control} />}
        {step === 5 && <Step5 setStep={setStep} formData={values} />}
      </form>
    </>
  )
}

export default RecruitingStepForm
