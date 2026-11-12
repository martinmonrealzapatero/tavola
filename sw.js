// Tavola's notification worker. A notification only ever says that something
// new is waiting; tapping it opens the app.
self.addEventListener("push", (event) => {
  let data = { title: "Pronto", body: "Something new from Pronto is waiting in the app." };
  try { data = { ...data, ...event.data.json() }; } catch (_) { /* keep the default */ }
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: "/favicon.ico", tag: "pronto" }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) if ("focus" in c) return c.focus();
      return clients.openWindow("/");
    }),
  );
});
