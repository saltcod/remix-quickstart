const faqs = [
  {
    question: 'Is this a dating site?',
    answer: "It's not meant to be, but it can be whatever you want. It's meant to help you find like-minds. ",
  },
  {
    question: 'Do I need to fill in all feilds?',
    answer:
      "You don't. The more you fill in the more accurate your matches will be, but every field is optional. You also don't need to use your real name or your real email address. If you're in the Apple ecosystem, you can create an anonymized email address.",
  },
  {
    question: 'What happens once I connect with someone?',
    answer:
      "When you request a connection to someone, they will get notified. If they accept, you'll be able to see each other's email address. From there, you're free to connect and go make friends!",
  },
  {
    question: 'Can I pause connections? Can I delete my account?',
    answer:
      "Yes and yes. You can pause connections at any time. when you do this, you won't come up as a match and no one can send you a connection request. You can also delete your account completely. We delete your account and all data in this process.",
  },
]

export default function FAQ() {
  return (
    <div className="scroll-m-t-24 bg-white-25 mt-24 border-t pt-12">
      <h2 className="text-lg font-bold">FAQ</h2>
      <div className="grid gap-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="mt-12 max-w-3xl">
            <h3 className="font-bold">{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
