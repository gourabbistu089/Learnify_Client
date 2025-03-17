Here’s a step-by-step guide to kill a process running on `localhost:5173` in Windows:

---

### **Step 1: Open Command Prompt**
1. Press **`Win + R`** to open the Run dialog.
2. Type `cmd` and press **`Enter`** to open Command Prompt.

---

### **Step 2: Check Which Process Is Using Port 5173**
1. In the Command Prompt, type the following command to check processes using port `5173`:
   ```bash
   netstat -ano | findstr :5173
   ```
2. This will display a line of output like this:
   ```
   TCP    127.0.0.1:5173    0.0.0.0:0    LISTENING    12345
   ```
   - The **last column** (`12345` in this example) is the **Process ID (PID)**.

---

### **Step 3: Open Task Manager**
1. Press **`Ctrl + Shift + Esc`** to open Task Manager.
2. Click on the **Details** tab.
3. Locate the PID found in Step 2 (e.g., `12345`).
4. If you find the corresponding process, you can right-click it and select **End Task**. Alternatively, proceed with the next step to kill it from the command line.

---

### **Step 4: Kill the Process**
1. In Command Prompt, run the following command to kill the process by its PID:
   ```bash
   taskkill /PID <PID> /F
   ```
   Replace `<PID>` with the PID obtained earlier (e.g., `12345`):
   ```bash
   taskkill /PID 12345 /F
   ```
2. You should see a confirmation message like this:
   ```
   SUCCESS: The process with PID 12345 has been terminated.
   ```

---

### **Step 5: Verify the Port Is Free**
To ensure the port is no longer in use, run the following command again:
```bash
netstat -ano | findstr :5173
```
If no output is displayed, the port is now free.

---

### Summary
1. Open Command Prompt and run: `netstat -ano | findstr :5173`.
2. Note the Process ID (PID) using the port.
3. Use `taskkill /PID <PID> /F` to terminate the process.
4. Verify the port is free with `netstat -ano | findstr :5173`. 

You're all set! 🎉