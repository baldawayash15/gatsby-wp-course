import React, { useEffect, useRef, useState } from 'react';

interface ContactFormProps {
  formId: number;
  formMarkup: string;
}

export const ContactForm7: React.FC<ContactFormProps> = ({
  formId,
  formMarkup,
}) => {
  const formRef = useRef<HTMLFieldSetElement>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (formRef?.current) {
      const formElement = formRef.current.getElementsByTagName('form')?.[0];

      if (formElement) {
        const handleSubmit = (e: any) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          fetch(
            `${process.env.GATSBY_WP_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
            {
              method: 'POST',
              body: formData,
            }
          ).then(() => {
            setHasSubmitted(true);
          });
        };
        formElement.addEventListener('submit', handleSubmit);
        return () => {
          formElement.removeEventListener('submit', handleSubmit);
        };
      }
    }
  }, [formRef, formId]);
  return hasSubmitted ? (
    <div className="bg-emerald-900 p-4 text-white text-center">
      Thank you. Contact details submitted.
    </div>
  ) : (
    <fieldset ref={formRef} dangerouslySetInnerHTML={{ __html: formMarkup }} />
  );
};
