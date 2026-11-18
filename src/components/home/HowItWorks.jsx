// src/components/home/HowItWorks.jsx
// The three-step explanation of how students use the site.
const STEPS = [
  {
    icon: 'bi-search', title: 'Search & filter',
    text: 'Pick your campus, budget and room type. Narrow results by distance, facilities and availability.',
  },
  {
    icon: 'bi-images', title: 'Compare hostels',
    text: 'See photos, every room type with its price, facilities, reviews and exactly where the hostel is on the map.',
  },
  {
    icon: 'bi-telephone', title: 'Contact the manager',
    text: 'Call or WhatsApp the hostel manager directly to ask questions and arrange a visit. No agent in the middle.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">Find a hostel in three steps</h2>
        </div>
        <div className="row g-4">
          {STEPS.map((step, index) => (
            <div className="col-md-4" key={step.title}>
              <div className="step-card">
                <span className="step-number">{index + 1}</span>
                <i className={`bi ${step.icon} step-icon`} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
