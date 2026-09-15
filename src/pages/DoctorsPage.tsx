import { Building2, ChevronLeft, ChevronRight, Clock3, GraduationCap, Search, Stethoscope, X } from "lucide-react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/LoadingState";
import { PageHeader } from "../components/PageHeader";
import doctors from "../data/doctors.json";
import "./doctors.css";

const PAGE_SIZE = 6;
const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))].sort();
const hospitals = [...new Set(doctors.map((doctor) => doctor.hospital))].sort();

export function DoctorsPage() {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLParagraphElement>(null);
  const query = params.get("q") ?? "";
  const specialty = params.get("specialty") ?? "all";
  const hospital = params.get("hospital") ?? "all";
  const needle = query.trim().toLocaleLowerCase("en-IN");
  const filtered = doctors.filter((doctor) =>
    (!needle || `${doctor.name} ${doctor.specialty} ${doctor.qualifications} ${doctor.hospital}`.toLocaleLowerCase("en-IN").includes(needle))
    && (specialty === "all" || doctor.specialty === specialty)
    && (hospital === "all" || doctor.hospital === hospital)
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = Boolean(query || specialty !== "all" || hospital !== "all");
  const setFilter = (key: string, value: string) => {
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value && value !== "all") next.set(key, value); else next.delete(key);
      if (key !== "page") next.delete("page");
      return next;
    }, { replace: key === "q" });
  };
  const resetFilters = () => { setParams({}); searchRef.current?.focus(); };
  const changePage = (nextPage: number) => {
    setFilter("page", String(nextPage));
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="page directory-page doctors-page">
      <PageHeader title="Doctors" description="Explore doctors, their specialties, qualifications, and hospital locations." actions={<span className="record-count">{doctors.length} source records</span>} />
      <section className="directory-toolbar panel doctors-toolbar" aria-label="Doctor filters">
        <div className="search-field">
          <Search aria-hidden="true" />
          <label className="sr-only" htmlFor="doctor-search">Search doctors</label>
          <input ref={searchRef} id="doctor-search" value={query} onChange={(event) => setFilter("q", event.target.value)} placeholder="Search name, specialty, qualification or hospital" />
          {query ? <button type="button" aria-label="Clear doctor search" onClick={() => { setFilter("q", ""); searchRef.current?.focus(); }}><X aria-hidden="true" /></button> : null}
        </div>
        <div className="select-field"><span><label htmlFor="doctor-specialty">Specialty</label></span><select id="doctor-specialty" value={specialty} onChange={(event) => setFilter("specialty", event.target.value)}><option value="all">All specialties</option>{specialties.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div className="select-field"><span><label htmlFor="doctor-hospital">Hospital / practice</label></span><select id="doctor-hospital" value={hospital} onChange={(event) => setFilter("hospital", event.target.value)}><option value="all">All hospitals & practices</option>{hospitals.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      </section>

      <div className="doctors-results-heading">
        <p ref={resultsRef} tabIndex={-1} role="status">{filtered.length ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} doctors` : "No matching doctors"}</p>
        {hasFilters ? <button type="button" className="button button-ghost" onClick={resetFilters}>Clear filters</button> : null}
      </div>
      {visible.length ? <section className="doctor-grid" aria-label="Doctor directory">
        {visible.map((doctor) => <article className="doctor-card panel" key={doctor.name}>
          <header className="doctor-card-heading">
            <span className="doctor-symbol"><Stethoscope aria-hidden="true" /></span>
            <div><h2>{doctor.name}</h2><p>{doctor.specialty}</p></div>
          </header>
          <dl className="doctor-facts">
            <div><dt><Clock3 aria-hidden="true" />Experience</dt><dd>{doctor.experience === null ? "Not provided" : `${doctor.experience} years`}</dd></div>
            <div><dt><GraduationCap aria-hidden="true" />Qualifications</dt><dd>{doctor.qualifications}</dd></div>
            <div><dt><Building2 aria-hidden="true" />Hospital / practice & location</dt><dd>{doctor.hospital}</dd></div>
          </dl>
          {doctor.notes ? <p className="doctor-notes">{doctor.notes}</p> : null}
        </article>)}
      </section> : <EmptyState title="No doctors found" message="Try a different name, specialty, qualification or hospital." action={<button className="button button-outline" type="button" onClick={resetFilters}>Clear search and filters</button>} />}

      {pages > 1 ? <nav className="pagination" aria-label="Doctor result pages"><button type="button" disabled={page === 1} onClick={() => changePage(page - 1)} aria-label="Previous doctor page"><ChevronLeft aria-hidden="true" /></button><span>Page <strong>{page}</strong> of {pages} · {filtered.length} results</span><button type="button" disabled={page === pages} onClick={() => changePage(page + 1)} aria-label="Next doctor page"><ChevronRight aria-hidden="true" /></button></nav> : null}
      <p className="doctor-provenance">Profiles reflect the supplied directory. Experience and hospital affiliations are listed as provided; appointment availability is not included.</p>
    </div>
  );
}
