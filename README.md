# Sample for reproducing bug in react-native-viewpager where wrong Views get destroyed in Java side and the pages become blank

![GIF showing the bug](/viewpager-blank-page-bug.gif)

Bug causes ReactViewpagerManager to remove wrong Views from its SparseArray of known Views, and when a Fragment tries to retrieve its View from that SparseArray it can't find it and shows a blank screen. Can be reproduced with this sample by with following steps:

1. Open app, **DO NOT** scroll at all to the next page on the Viewpager shown on the first screen
2. Click `Goto NestedStack` text to navigate to another screen that also has a Viewpager
3. Navigate back and now try to check the other page in the first Viewpager, it should be blank

What happens in the sample is that when React Native destroys the Viewpager of the second screen, ReactViewPagerManager's removeView(Viewpager2, int) method gets called, and it uses the int directly on a SparseArray of all Viewpagers' children in the app instead of looking up that spesific Viewpager's child at that index.

Also, when looking up a Viewpager's child View with index like it's supposed to, if the Fragment hasn't been shown yet then the lookup can return a null even though the View exists in that SparseArray. So those Views can leak memory in some cases.

Fix to both of these can be found 
[on this branch on my fork](https://github.com/Pikkuninja/react-native-viewpager/tree/fix/android-view-destroying-bug).
I've added a patch file that applies changes on that branch to this repo for easier testing, just run `yarn patch-package`
or `yarn patch-package --reverse` to unapply the fixes.
