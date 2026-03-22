import { useState } from "react";
import "../styles/EnrollmentForms.css";
import { useEffect } from "react";
import axios from "axios";



const ITEMS_PER_PAGE = 10;

function StatusBadge({ status }) {
  const map = {
    Approved: { className: "badge badge-approved", icon: "✓" },
    Pending: { className: "badge badge-pending", icon: "⏱" },
    Rejected: { className: "badge badge-rejected", icon: "✕" },
  };
  const { className, icon } = map[status] || {};
  return (
    <span className={className}>
      <span className="badge-icon">{icon}</span> {status}
    </span>
  );
}


function EnrollmentForms() {

  
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = data.filter((row) => {
    const matchSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" || row.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalSubmitted = data.length;
  const pending = data.filter((r) => r.status === "Pending").length;
  const approved = data.filter((r) => r.status === "Approved").length;
  const rejected = data.filter((r) => r.status === "Rejected").length;
    const fetchForms = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/enrollment-form");

      const formatted = res.data.map((item, index) => ({
        id: item._id,
        date: new Date(item.createdAt).toLocaleDateString(),
        name: `${item.personalDetails?.givenName || ""} ${item.personalDetails?.surname || ""}`,
        email: item.personalDetails?.email,
        phone: item.personalDetails?.mobilePhone,
        course: item.enrollment?.units?.join(", ") || "N/A",
        bookingDate: item.enrollment?.preferredStartDate
          ? new Date(item.enrollment.preferredStartDate).toLocaleDateString()
          : "N/A",
        type: "Individual", // later dynamic pannalaam
        status: item.status,
        enrollments: item.enrollment?.units?.length || 1,
      }));

      setData(formatted);
    } catch (err) {
      console.error(err);
    }
  };
    useEffect(() => {
    fetchForms();
  }, []);

  const handlePrint = (id) => {
  window.open(`/print.html?id=${id}`, "_blank");
};

  return (
    <div className="ef-container">
      <div className="ef-header">
        <h2 className="ef-title">Student Enrollment Forms</h2>
        <p className="ef-subtitle">Review and manage student enrollment form submissions</p>
      </div>

      {/* Stat Cards */}
      <div className="ef-stats">
        <div className="stat-card">
          <div>
            <p className="stat-label">Total Submitted</p>
            <p className="stat-value purple-enrl">{totalSubmitted}</p>
          </div>
          <div className="stat-icon purple-bg">📋</div>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-label">Pending Review</p>
            <p className="stat-value yellow">{pending}</p>
          </div>
          <div className="stat-icon yellow-bg">⏱</div>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-label">Approved</p>
            <p className="stat-value green-enrl">{approved}</p>
          </div>
          <div className="stat-icon green-bg">✓</div>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-label">Rejected</p>
            <p className="stat-value red">{rejected}</p>
          </div>
          <div className="stat-icon red-bg">✕</div>
        </div>
      </div>

      {/* Filters */}
      <div className="ef-filters">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="ef-search"
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <select
          className="ef-select"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
        >
          <option>All Status</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="ef-table-section">
        <div className="ef-table-header">
          <div>
            <h3 className="ef-table-title">Enrollment Forms ({filtered.length})</h3>
            <p className="ef-table-sub">Review submitted enrollment forms</p>
          </div>
        </div>

        <div className="ef-table-wrapper">
          <table className="ef-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Course booking date</th>
                <th>Individual/Company</th>
                <th>Status</th>
                <th>Enrollments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>
                    <div className="name-cell">
                      <span className="avatar"><i className="fa-regular fa-user"></i></span>
                      {row.name}
                    </div>
                  </td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.course}</td>
                  <td>{row.bookingDate}</td>
                  <td>{row.type}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td>
                    <span className="enrollments-badge">{row.enrollments} course</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="View"><i className="fa-regular fa-eye"></i></button>
                      <button className="action-btn icon-btn" title="Document"><i className="fa-regular fa-file"></i></button>
                      <button className="action-btn icon-btn" onClick={() => handlePrint(row.id)} title="Print"><i className="fa-solid fa-print"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={10} className="no-results">No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="ef-pagination">
          <span className="pagination-info">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
          </span>
          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
            <button
              className="page-btn"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentForms;