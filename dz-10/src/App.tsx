import { useState, type FormEvent } from "react";
import {
  profileSchema,
  type ProfileFormData,
} from "./schemas/profileSchema";
import "./App.css";

const initialValues: ProfileFormData = {
  fullName: "",
  email: "",
  birthDate: "",
  accountType: "personal",
  companyName: "",
  role: "developer",
  otherRole: "",
  newsletter: false,
  frequency: "weekly",
};

function App() {
  const [form, setForm] =
    useState<ProfileFormData>(initialValues);

  const [touched, setTouched] = useState<
    Record<string, boolean>
  >({});

  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const result = profileSchema.safeParse(form);
  const errors: Record<string, string> = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = String(issue.path[0]);

      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
  }

  const isValid = result.success;

  function updateField<K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K]
  ) {
    setForm((prev: ProfileFormData) => ({
      ...prev,
      [field]: value,
    }));

    setTouched((prev: Record<string, boolean>) => ({
      ...prev,
      [field]: true,
    }));

    setSaved(false);
  }

  function getError(field: string) {
    return touched[field] || submitted
      ? errors[field]
      : undefined;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const validation = profileSchema.safeParse(form);

    if (validation.success) {
      console.log("Saved profile:", validation.data);
      setSaved(true);
    }
  }

  function handleReset() {
    setForm(initialValues);
    setTouched({});
    setSubmitted(false);
    setSaved(false);
  }

  const previewData = {
    fullName: form.fullName,
    email: form.email,
    birthDate: form.birthDate,
    accountType: form.accountType,
    ...(form.accountType === "business"
      ? { companyName: form.companyName }
      : {}),
    role: form.role,
    ...(form.role === "other"
      ? { otherRole: form.otherRole }
      : {}),
    newsletter: form.newsletter,
    ...(form.newsletter
      ? { frequency: form.frequency }
      : {}),
  };

  return (
    <main className="page">
      <h1>Edit Profile</h1>

      <div className="layout">
        <form
          className="profile-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2>Profile Information</h2>

          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            value={form.fullName}
            onChange={(e) =>
              updateField("fullName", e.target.value)
            }
            placeholder="Your full name"
          />
          {getError("fullName") && (
            <p className="error">{getError("fullName")}</p>
          )}

          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            placeholder="name@example.com"
          />
          {getError("email") && (
            <p className="error">{getError("email")}</p>
          )}

          <label htmlFor="birthDate">Date of Birth *</label>
          <input
            id="birthDate"
            type="date"
            max={(() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() - 18);

              const year = date.getFullYear();
              const month = String(
                date.getMonth() + 1
              ).padStart(2, "0");
              const day = String(date.getDate()).padStart(
                2,
                "0"
              );

              return `${year}-${month}-${day}`;
            })()}
            value={form.birthDate}
            onChange={(e) =>
              updateField("birthDate", e.target.value)
            }
          />
          {getError("birthDate") && (
            <p className="error">{getError("birthDate")}</p>
          )}

          <label>Account Type *</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="accountType"
                checked={form.accountType === "personal"}
                onChange={() =>
                  updateField("accountType", "personal")
                }
              />
              Personal
            </label>

            <label>
              <input
                type="radio"
                name="accountType"
                checked={form.accountType === "business"}
                onChange={() =>
                  updateField("accountType", "business")
                }
              />
              Business
            </label>
          </div>

          {form.accountType === "business" && (
            <>
              <label htmlFor="companyName">Company Name *</label>
              <input
                id="companyName"
                value={form.companyName ?? ""}
                onChange={(e) =>
                  updateField("companyName", e.target.value)
                }
                placeholder="Company name"
              />
              {getError("companyName") && (
                <p className="error">
                  {getError("companyName")}
                </p>
              )}
            </>
          )}

          <label htmlFor="role">Role *</label>
          <select
            id="role"
            value={form.role}
            onChange={(e) =>
              updateField(
                "role",
                e.target.value as ProfileFormData["role"]
              )
            }
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
          </select>

          {form.role === "other" && (
            <>
              <label htmlFor="otherRole">
                Specify Your Role *
              </label>
              <input
                id="otherRole"
                value={form.otherRole ?? ""}
                onChange={(e) =>
                  updateField("otherRole", e.target.value)
                }
                placeholder="Your role"
              />
              {getError("otherRole") && (
                <p className="error">{getError("otherRole")}</p>
              )}
            </>
          )}

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.newsletter}
              onChange={(e) =>
                updateField("newsletter", e.target.checked)
              }
            />
            Subscribe to newsletter
          </label>

          {form.newsletter && (
            <>
              <label htmlFor="frequency">
                Newsletter Frequency *
              </label>
              <select
                id="frequency"
                value={form.frequency ?? ""}
                onChange={(e) =>
                  updateField(
                    "frequency",
                    e.target.value as "daily" | "weekly"
                  )
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
              {getError("frequency") && (
                <p className="error">{getError("frequency")}</p>
              )}
            </>
          )}

          <div className="buttons">
            <button type="submit" disabled={!isValid}>
              Save
            </button>
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          {saved && (
            <p className="success">
              Profile validated successfully!
            </p>
          )}
        </form>

        <section className="preview">
          <h2>Live Preview</h2>

          <p>
            <strong>Name:</strong>{" "}
            {form.fullName || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {form.email || "Not provided"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {form.birthDate || "Not provided"}
          </p>
          <p>
            <strong>Account:</strong> {form.accountType}
          </p>

          {form.accountType === "business" && (
            <p>
              <strong>Company:</strong>{" "}
              {form.companyName || "Not provided"}
            </p>
          )}

          <p>
            <strong>Role:</strong>{" "}
            {form.role === "other"
              ? form.otherRole || "Not provided"
              : form.role}
          </p>

          <p>
            <strong>Newsletter:</strong>{" "}
            {form.newsletter ? "Yes" : "No"}
          </p>

          {form.newsletter && (
            <p>
              <strong>Frequency:</strong> {form.frequency}
            </p>
          )}

          <h3>Form Data (JSON)</h3>
          <pre>{JSON.stringify(previewData, null, 2)}</pre>

          <p className={isValid ? "valid" : "invalid"}>
            {isValid
              ? "Form is valid"
              : "Please complete the form correctly"}
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;
