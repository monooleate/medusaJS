// src/admin/widgets/ProductMetaEditor.tsx
import * as React from "react"
import { Button } from "@medusajs/ui"
import { defineWidgetConfig } from "@medusajs/admin-sdk"

type Props = {
  data: { id: string; metadata?: Record<string, any> }
}

type MetaFieldEditorProps = {
  obj: Record<string, any>
  onChange: (newObj: Record<string, any>) => void
}

/**
 * Rekurzív editor
 */
const MetaFieldEditor = ({ obj, onChange }: MetaFieldEditorProps) => {
  const [localKeys, setLocalKeys] = React.useState<Record<string, string>>(
    Object.fromEntries(Object.keys(obj).map((k) => [k, k]))
  )

  const handleKeyChange = (oldKey: string, newKey: string) => {
    setLocalKeys((prev) => ({ ...prev, [oldKey]: newKey }))
  }

  const commitKeyChange = (oldKey: string, newKey: string, value: any) => {
    if (!newKey || oldKey === newKey) return
    const clone = { ...obj }
    delete clone[oldKey]
    clone[newKey] = value
    onChange(clone)

    setLocalKeys((prev) => {
      const updated = { ...prev }
      delete updated[oldKey]
      updated[newKey] = newKey
      return updated
    })
  }

  const handleValueChange = (key: string, val: any) => {
    const clone = { ...obj, [key]: val }
    onChange(clone)
  }

  const removeField = (key: string) => {
    const clone = { ...obj }
    delete clone[key]
    onChange(clone)
  }

  const addField = () => {
    const key = `uj_mezo_${Date.now()}`
    onChange({ ...obj, [key]: "" })
    setLocalKeys((prev) => ({ ...prev, [key]: key }))
  }

  return (
    <div className="flex flex-col gap-3 ml-2 border-l pl-3 border-gray-300 dark:border-gray-700">
      {Object.entries(obj).map(([k, v]) => {
        const localKey = localKeys[k] ?? k
        return (
          <div key={k} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* Kulcs szerkesztése */}
              <input
                className="border p-2 rounded w-1/4
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-gray-100"
                value={localKey}
                onChange={(e) => handleKeyChange(k, e.target.value)}
                onBlur={(e) => commitKeyChange(k, e.target.value, v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    commitKeyChange(k, (e.target as HTMLInputElement).value, v)
                  }
                }}
              />

              {/* Érték vagy nested object */}
              {typeof v === "object" && v !== null ? (
                <div className="flex-1">
                  <MetaFieldEditor
                    obj={v}
                    onChange={(newChild) => handleValueChange(k, newChild)}
                  />
                </div>
              ) : (
                <input
                  className="border p-2 rounded flex-1 w-full resize
                    border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-900
                    text-gray-900 dark:text-gray-100"
                  value={String(v)}
                  onChange={(e) => handleValueChange(k, e.target.value)}
                />
              )}

              {/* Törlés gomb */}
              <Button
                variant="danger"
                size="small"
                onClick={() => removeField(k)}
              >
                Törlés
              </Button>
            </div>
          </div>
        )
      })}
      <Button onClick={addField} variant="secondary" size="small">
        + Új mező
      </Button>
    </div>
  )
}

/**
 * Fő widget
 */
const ProductMetaEditor = ({ data }: Props) => {
  const [meta, setMeta] = React.useState<Record<string, any>>(data.metadata ?? {})
  const [saving, setSaving] = React.useState(false)
  const [statusMsg, setStatusMsg] = React.useState<string | null>(null)

  React.useEffect(() => {
    setMeta(data.metadata ?? {})
  }, [data.id])

  const handleSave = async () => {
    setSaving(true)
    setStatusMsg(null)
    try {
      // Update
      const updateRes = await fetch(`${window.location.origin}/admin/products/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ metadata: meta }),
      })

      if (!updateRes.ok) {
        const errTxt = await updateRes.text()
        console.error("Update error:", updateRes.status, errTxt)
        throw new Error(`Update failed: ${updateRes.status}`)
      }

      // 🔑 Friss product visszakérése az adatbázisból
      const res = await fetch(`${window.location.origin}/admin/products/${data.id}`, {
        credentials: "include",
      })
      const json = await res.json()
      setMeta(json.product.metadata ?? {})

      setStatusMsg("Mentve ✅")
    } catch (err) {
      console.error("Mentési hiba:", err)
      setStatusMsg("Hiba történt ❌")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 border rounded 
      bg-gray-50 dark:bg-gray-900 
      border-gray-200 dark:border-gray-700
      text-gray-900 dark:text-gray-100"
    >
      <h3 className="font-semibold text-lg">SEO / Spec mezők szerkesztése</h3>
      <MetaFieldEditor obj={meta} onChange={setMeta} />
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving} variant="primary">
          {saving ? "Mentés..." : "Mentés"}
        </Button>
        {statusMsg && <span className="text-sm">{statusMsg}</span>}
      </div>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductMetaEditor
